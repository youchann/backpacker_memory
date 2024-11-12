package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Welcome to Backpacker Memory API",
		})
	})

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.GET("/hoge", func(c *gin.Context) {
		// バケット名を指定
		bucketName := "backpacker-images"

		// AWSの設定をロード
		cfg, err := config.LoadDefaultConfig(context.TODO())
		if err != nil {
			log.Fatalf("AWS設定の読み込みに失敗: %v", err)
		}

		// S3クライアントを作成
		client := s3.NewFromConfig(cfg)

		// バケット内のオブジェクト一覧を取得（アクセス権限の確認）
		_, err = client.ListObjectsV2(context.TODO(), &s3.ListObjectsV2Input{
			Bucket: &bucketName,
		})
		if err != nil {
			log.Fatalf("バケット '%s' へのアクセスに失敗: %v", bucketName, err)
		}

		fmt.Printf("バケット '%s' へのアクセスに成功しました\n", bucketName)

		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	if err := r.Run(":8080"); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}

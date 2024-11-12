package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/youchann/backpacker_memory/backend/client/aws"
)

var s3BucketName = "backpacker-images"
var s3regionsPath = "pins/"

func main() {
	r := gin.Default()
	s3Client, err := aws.NewS3Client(s3BucketName)
	if err != nil {
		log.Fatal("Failed to create S3 client:", err)
	}

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Welcome to Backpacker Memory API",
		})
	})

	r.GET("/regions", func(c *gin.Context) {
		regions, err := s3Client.GetDirectoryNames(c, s3regionsPath)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Failed to get regions",
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"regions": regions,
		})
	})

	r.GET("/regions/:region", func(c *gin.Context) {
		region := c.Param("region")
		if region == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Region parameter is required",
			})
			return
		}

		s3Path := s3regionsPath + region + "/"

		urls, err := s3Client.GetObjectPublicURLs(c, s3Path)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Failed to get region data",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"urls": urls,
		})
	})

	if err := r.Run(":8080"); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}

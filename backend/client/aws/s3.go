package aws

import (
	"context"
	"fmt"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3Client struct {
	bucketName string
	client     *s3.Client
	config     aws.Config
}

func NewS3Client(bucketName string) (*S3Client, error) {
	config, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return nil, fmt.Errorf("AWS設定の読み込みに失敗: %w", err)
	}
	client := s3.NewFromConfig(config)
	return &S3Client{bucketName, client, config}, nil
}

func (s *S3Client) GetDirectoryNames(ctx context.Context, path string) ([]string, error) {
	input := &s3.ListObjectsV2Input{
		Bucket:    &s.bucketName,
		Prefix:    &path,
		Delimiter: aws.String("/"),
	}

	var directoryNames []string
	paginator := s3.NewListObjectsV2Paginator(s.client, input)
	for paginator.HasMorePages() {
		output, err := paginator.NextPage(ctx)
		if err != nil {
			return nil, fmt.Errorf("ディレクトリ一覧の取得に失敗: %w", err)
		}

		for _, prefix := range output.CommonPrefixes {
			dirPath := strings.TrimSuffix(*prefix.Prefix, "/")
			if lastSlash := strings.LastIndex(dirPath, "/"); lastSlash != -1 {
				dirName := dirPath[lastSlash+1:]
				directoryNames = append(directoryNames, dirName)
			} else {
				directoryNames = append(directoryNames, dirPath)
			}
		}
	}

	return directoryNames, nil
}

func (s *S3Client) GetObjectPublicURLs(ctx context.Context, path string) ([]string, error) {
	input := &s3.ListObjectsV2Input{
		Bucket:    &s.bucketName,
		Prefix:    &path,
		Delimiter: aws.String("/"),
	}

	var urls []string
	paginator := s3.NewListObjectsV2Paginator(s.client, input)

	for paginator.HasMorePages() {
		output, err := paginator.NextPage(ctx)
		if err != nil {
			return nil, fmt.Errorf("オブジェクト一覧の取得に失敗: %w", err)
		}

		for _, obj := range output.Contents {
			name := strings.TrimPrefix(*obj.Key, path)
			if name != "" && !strings.Contains(name, "/") {
				url := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s",
					s.bucketName,
					s.config.Region,
					*obj.Key)

				urls = append(urls, url)
			}
		}
	}

	return urls, nil
}

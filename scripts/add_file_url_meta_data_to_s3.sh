#!/bin/bash

if [ $# -ne 1 ]; then
    echo "使用方法: $0 'ロケーション'"
    echo "例: $0 '47.497N_19.040E_Budapest'"
    exit 1
fi

LOCATION="$1"
BUCKET="backpacker-images"
SOURCE_PATH="pins/$LOCATION"
DEST_PATH="meta/$LOCATION.txt"

if ! aws s3 ls "$BUCKET/$SOURCE_PATH/" | \
    awk -v loc="$SOURCE_PATH" '{print "https://backpacker-images.s3.ap-northeast-1.amazonaws.com/" loc "/" $4}' | \
    aws s3 cp - "s3://$BUCKET/$DEST_PATH"; then
    echo "処理に失敗しました"
    exit 1
fi

echo "URLリストの生成とアップロードが完了しました"
echo "生成されたファイル: s3://$BUCKET/$DEST_PATH"
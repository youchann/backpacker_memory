#!/bin/bash

if [ $# -ne 1 ]; then
    echo "使用方法: $0 '追加したい文字列'"
    echo "例: $0 '47.497N_19.040E_Budapest'"
    exit 1
fi

BUCKET="backpacker-images"
FILE_KEY="meta/journey_plot.txt"
APPEND_TEXT="$1"
TEMP_DIR=$(mktemp -d)
TEMP_FILE="$TEMP_DIR/temp.txt"

if ! aws s3 cp "s3://$BUCKET/$FILE_KEY" "$TEMP_FILE"; then
    echo "S3からのファイルダウンロードに失敗しました"
    rm -rf "$TEMP_DIR"
    exit 1
fi

printf "\n%s" "$APPEND_TEXT" >> "$TEMP_FILE"

if ! aws s3 cp "$TEMP_FILE" "s3://$BUCKET/$FILE_KEY"; then
    echo "S3へのファイルアップロードに失敗しました"
    rm -rf "$TEMP_DIR"
    exit 1
fi

rm -rf "$TEMP_DIR"
echo "ファイルの更新が完了しました"
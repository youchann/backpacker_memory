#!/bin/bash

# 使用方法をチェック
if [ "$#" -ne 1 ]; then
    echo "使用方法: $0 <ディレクトリパス>"
    exit 1
fi

# 入力ディレクトリ
DIR="$1"

# ディレクトリの存在確認
if [ ! -d "$DIR" ]; then
    echo "エラー: ディレクトリ '$DIR' が見つかりません。"
    exit 1
fi

# heif-convertコマンドの存在確認
if ! command -v heif-convert &> /dev/null; then
    echo "エラー: heif-convertコマンドが見つかりません。libheifをインストールしてください。"
    exit 1
fi

# HEICファイルを処理
find "$DIR" -type f -iname "*.heic" | while read -r file; do
    # 出力JPEGファイル名を生成
    jpeg_file="${file%.*}.jpg"
    
    echo "変換中: $file"
    
    # HEICをJPEGに変換
    if heif-convert "$file" "$jpeg_file"; then
        echo "変換成功: $jpeg_file"
        
        # 元のHEICファイルを削除
        if rm "$file"; then
            echo "元のファイルを削除しました: $file"
        else
            echo "警告: 元のファイルの削除に失敗しました: $file"
        fi
    else
        echo "エラー: 変換に失敗しました: $file"
    fi
done

echo "変換プロセスが完了しました。"
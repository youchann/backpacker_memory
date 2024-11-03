SHELL := /bin/bash
FRONTEND_DIR := frontend
S3_BUCKET := backpacker-images

############################################################
# 【地域を追加する方法】
# 1. scripts/heic_to_jpeg.sh を利用して、heic 画像を jpeg 画像に変換する
# 2. S3に画像群をアップロードする e.g. $ aws s3 cp ~/Downloads/47.497N_19.040E_Budapest s3://backpacker-images/pins/47.497N_19.040E_Budapest/ --recursive
# 3. scripts/add_file_url_meta_data_to_s3.sh を利用して、ファイルURLを追加する
# 5. scripts/add_region_meta_data_to_s3.sh を利用して、地域を追加する
# Date: 2024
############################################################

.PHONY: frontend-deploy
frontend-deploy:
	(cd $(FRONTEND_DIR) && \
		npm run build && \
		aws s3 cp ./dist s3://$(S3_BUCKET)/ --recursive)

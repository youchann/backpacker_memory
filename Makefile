SHELL := /bin/bash
FRONTEND_DIR := frontend
S3_BUCKET := backpacker-images

############################################################
# 【地域を追加する方法】
# 1. scripts/heic_to_jpeg.sh を利用して、heic 画像を jpeg 画像に変換する
# 2. 画像を軽量化する e.g. $ jpegoptim --strip-all --totals --max=10 *.{jpg,JPG}
# 3. S3に画像群をアップロードする e.g. $ aws s3 cp ~/Downloads/47.497N_19.040E_Budapest s3://backpacker-images/pins/47.497N_19.040E_Budapest/ --recursive
############################################################

.PHONY: frontend-deploy
frontend-deploy:
	(cd $(FRONTEND_DIR) && \
		npm run build && \
		aws s3 cp ./dist s3://$(S3_BUCKET)/ --recursive)

# TODO: Account IDをCommitしたくないので、後ほどCI/CDを作る
# .PHONY: backend-deploy backend-build backend-push
# backand-deploy: backand-build backand-push
# backend-build:
# 	docker build -t xxxxxxxxx.dkr.ecr.ap-northeast-1.amazonaws.com/backpacker-memory-backend:latest ./backend
# backend-push:
# 	docker push xxxxxxxxx.dkr.ecr.ap-northeast-1.amazonaws.com/backpacker-memory-backend:latest

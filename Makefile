SHELL := /bin/bash
FRONTEND_DIR := frontend
S3_BUCKET := backpacker-images

.PHONY: frontend-deploy
frontend-deploy:
	(cd $(FRONTEND_DIR) && \
		npm run build && \
		aws s3 cp ./dist s3://$(S3_BUCKET)/ --recursive)

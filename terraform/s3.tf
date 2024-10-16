resource "aws_s3_bucket" "backpacker_memory" {
  bucket = "backpacker-images"
}

resource "aws_s3_bucket_website_configuration" "backpacker_memory" {
  bucket = aws_s3_bucket.backpacker_memory.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_public_access_block" "backpacker_memory" {
  bucket = aws_s3_bucket.backpacker_memory.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "backpacker_memory" {
  bucket = aws_s3_bucket.backpacker_memory.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.backpacker_memory.arn}/*"
      },
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.backpacker_memory]
}

resource "aws_ecr_repository" "backpacker_memory_backend" {
  name                 = "backpacker-memory-backend"
  image_scanning_configuration {
    scan_on_push = true
  }
}

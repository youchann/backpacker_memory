resource "aws_iam_role" "app_runner_service" {
  name = "backpacker-memory-backend-app-runner-service-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = [
            "build.apprunner.amazonaws.com",
            "tasks.apprunner.amazonaws.com"
          ]
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "app_runner_service" {
  role       = aws_iam_role.app_runner_service.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"
}

resource "aws_iam_role" "app_runner_instance" {
  name = "backpacker-memory-backend-app-runner-instance-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "tasks.apprunner.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_apprunner_service" "backpacker_memory_backend" {
  service_name = "backpacker-memory-backend"
  source_configuration {
    authentication_configuration {
      access_role_arn = aws_iam_role.app_runner_service.arn
    }
    image_repository {
      image_configuration {
        port = "8080"
      }
      image_identifier      = "${aws_ecr_repository.backpacker_memory_backend.repository_url}:latest"
      image_repository_type = "ECR"
    }
    auto_deployments_enabled = true # ECRの更新を自動検知してデプロイ
  }
  instance_configuration {
    cpu               = "0.25 vCPU" # 最小CPU（1/4 vCPU）
    memory            = "0.5 GB"    # 最小メモリ（0.5 GB）
    instance_role_arn = aws_iam_role.app_runner_instance.arn
  }
}

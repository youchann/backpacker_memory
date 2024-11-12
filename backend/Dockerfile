FROM golang:1.23.2-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

ENV GOOS=linux
ENV GOARCH=amd64
RUN CGO_ENABLED=0 go build -o main .

# 実行ステージ
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/main .

EXPOSE 8080
CMD ["./main"]

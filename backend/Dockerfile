FROM golang:1.23.2-alpine

WORKDIR /app

RUN apk add --no-cache \
    git \
    make \
    gcc \
    libc-dev

RUN go install github.com/air-verse/air@latest

COPY go.mod go.sum ./

RUN go mod download

COPY . .

CMD ["air"]
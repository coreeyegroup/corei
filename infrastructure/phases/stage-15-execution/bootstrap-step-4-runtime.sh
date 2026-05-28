#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-15 STEP-4 — RUNTIME SERVICE SCAFFOLDING"
echo "=================================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"

cd "$ROOT_DIR"

SERVICES=(
  execution-intent-service
  account-routing-service
  risk-engine-service
  policy-engine-service
  position-sizer-service
  order-engine-service
)

for service in "${SERVICES[@]}"; do

  echo
  echo "Scaffolding runtime for: $service"

  SERVICE_DIR="services/execution/$service"

  echo "[1/8] Creating Go module..."

cat <<MODULE > $SERVICE_DIR/go.mod
module corei/services/execution/$service

go 1.24.0

require (
    github.com/gin-gonic/gin v1.10.0
    github.com/rs/zerolog v1.33.0
    github.com/segmentio/kafka-go v0.4.47
    github.com/spf13/viper v1.20.1
)
MODULE

  echo "[2/8] Creating main.go..."

mkdir -p $SERVICE_DIR/cmd

cat <<MAIN > $SERVICE_DIR/cmd/main.go
package main

import (
    "context"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"

    "github.com/gin-gonic/gin"
    "github.com/rs/zerolog"
    "github.com/rs/zerolog/log"
)

func main() {
    zerolog.TimeFieldFormat = zerolog.TimeFormatUnix

    log.Info().
        Str("service", "$service").
        Msg("starting execution service")

    router := gin.Default()

    router.GET("/health/live", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "status": "alive",
            "service": "$service",
        })
    })

    router.GET("/health/ready", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "status": "ready",
            "service": "$service",
        })
    })

    srv := &http.Server{
        Addr:    ":8080",
        Handler: router,
    }

    go func() {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatal().
                Err(err).
                Msg("server startup failed")
        }
    }()

    log.Info().
        Str("service", "$service").
        Msg("service runtime initialized")

    quit := make(chan os.Signal, 1)

    signal.Notify(
        quit,
        syscall.SIGINT,
        syscall.SIGTERM,
    )

    <-quit

    log.Info().
        Str("service", "$service").
        Msg("shutdown signal received")

    ctx, cancel := context.WithTimeout(
        context.Background(),
        5*time.Second,
    )

    defer cancel()

    if err := srv.Shutdown(ctx); err != nil {
        log.Fatal().
            Err(err).
            Msg("graceful shutdown failed")
    }

    log.Info().
        Str("service", "$service").
        Msg("service shutdown completed")
}
MAIN

  echo "[3/8] Creating config loader..."

cat <<CONFIG > $SERVICE_DIR/internal/config/config.go
package config

import (
    "github.com/spf13/viper"
)

type Config struct {
    ServiceName string
    KafkaBrokers []string
    Environment string
}

func LoadConfig() (*Config, error) {

    viper.AutomaticEnv()

    cfg := &Config{
        ServiceName: "$service",
        KafkaBrokers: []string{
            "kafka.messaging.svc.cluster.local:9092",
        },
        Environment: viper.GetString("ENVIRONMENT"),
    }

    return cfg, nil
}
CONFIG

  echo "[4/8] Creating Kafka runtime scaffold..."

cat <<KAFKA > $SERVICE_DIR/internal/kafka/kafka.go
package kafka

import (
    "github.com/segmentio/kafka-go"
)

type Client struct {
    Reader *kafka.Reader
    Writer *kafka.Writer
}

func NewClient(brokers []string) *Client {
    return &Client{
        Reader: &kafka.Reader{
            Brokers: brokers,
        },
        Writer: &kafka.Writer{
            Addr: kafka.TCP(brokers...),
        },
    }
}
KAFKA

  echo "[5/8] Creating lineage utility..."

cat <<LINEAGE > $SERVICE_DIR/internal/lineage/lineage.go
package lineage

import (
    "crypto/sha256"
    "encoding/hex"
)

func GenerateHash(input string) string {

    hash := sha256.Sum256([]byte(input))

    return hex.EncodeToString(hash[:])
}
LINEAGE

  echo "[6/8] Creating health runtime..."

cat <<HEALTH > $SERVICE_DIR/internal/health/health.go
package health

type Status struct {
    Service string \`json:"service"\`
    Status  string \`json:"status"\`
}
HEALTH

  echo "[7/8] Creating Makefile..."

cat <<MAKE > $SERVICE_DIR/Makefile
SERVICE_NAME=$service

build:
go build -o bin/\$(SERVICE_NAME) ./cmd

run:
go run ./cmd/main.go

test:
go test ./...

fmt:
go fmt ./...

vet:
go vet ./...

clean:
rm -rf bin/
MAKE

  echo "[8/8] Creating Dockerfile..."

cat <<DOCKER > $SERVICE_DIR/Dockerfile
FROM golang:1.24-alpine

WORKDIR /app

COPY . .

RUN go mod tidy
RUN go build -o service ./cmd

EXPOSE 8080

CMD ["./service"]
DOCKER

done

echo
echo "=================================================="
echo "ALL EXECUTION RUNTIME SCAFFOLDS CREATED"
echo "=================================================="
echo

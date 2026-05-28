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
        Str("service", "policy-engine-service").
        Msg("starting execution service")

    router := gin.Default()

    router.GET("/health/live", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "status": "alive",
            "service": "policy-engine-service",
        })
    })

    router.GET("/health/ready", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "status": "ready",
            "service": "policy-engine-service",
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
        Str("service", "policy-engine-service").
        Msg("service runtime initialized")

    quit := make(chan os.Signal, 1)

    signal.Notify(
        quit,
        syscall.SIGINT,
        syscall.SIGTERM,
    )

    <-quit

    log.Info().
        Str("service", "policy-engine-service").
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
        Str("service", "policy-engine-service").
        Msg("service shutdown completed")
}

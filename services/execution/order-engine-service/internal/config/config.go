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
        ServiceName: "order-engine-service",
        KafkaBrokers: []string{
            "kafka.messaging.svc.cluster.local:9092",
        },
        Environment: viper.GetString("ENVIRONMENT"),
    }

    return cfg, nil
}

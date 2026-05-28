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

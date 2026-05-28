SERVICE_NAME=position-sizer-service

build:
go build -o bin/$(SERVICE_NAME) ./cmd

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

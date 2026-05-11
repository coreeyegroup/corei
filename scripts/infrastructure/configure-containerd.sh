#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Configuring Docker + containerd"
echo "========================================="

sudo mkdir -p /etc/docker

cat <<JSON | sudo tee /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
JSON

sudo mkdir -p /etc/containerd

sudo containerd config default \
| sudo tee /etc/containerd/config.toml > /dev/null

sudo sed -i \
's/SystemdCgroup = false/SystemdCgroup = true/' \
/etc/containerd/config.toml

sudo systemctl restart containerd
sudo systemctl restart docker

echo
echo "Container runtime configuration completed."

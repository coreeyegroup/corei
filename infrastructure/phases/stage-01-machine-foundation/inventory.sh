#!/usr/bin/env bash
set -euo pipefail

OUTPUT_DIR="$HOME/corei/infrastructure/state/stage-01/inventory"

mkdir -p "$OUTPUT_DIR"

OUTPUT_FILE="$OUTPUT_DIR/runtime-inventory.txt"

{
echo "================ HOSTNAME ================"
hostnamectl

echo
echo "================ OS VERSION ================"
lsb_release -a

echo
echo "================ KERNEL ================"
uname -a

echo
echo "================ MEMORY ================"
free -h

echo
echo "================ FILESYSTEM ================"
df -h

echo
echo "================ SWAP ================"
swapon --show

echo
echo "================ NETWORK ================"
ip addr

echo
echo "================ FIREWALL ================"
sudo ufw status verbose

echo
echo "================ DOCKER ================"
docker --version

echo
echo "================ PYTHON ================"
python3.11 --version

} | tee "$OUTPUT_FILE"

echo "[INFO] Inventory complete -> $OUTPUT_FILE"

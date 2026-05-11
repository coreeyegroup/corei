#!/usr/bin/env bash

set -euo pipefail

TERRAFORM_VERSION="1.8.5"

echo "========================================="
echo "Installing Terraform ${TERRAFORM_VERSION}"
echo "========================================="

TMP_DIR=$(mktemp -d)

cd "$TMP_DIR"

wget -q \
"https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip"

sudo apt-get install -y unzip

unzip \
"terraform_${TERRAFORM_VERSION}_linux_amd64.zip"

sudo rm -f /usr/local/bin/terraform

sudo mv terraform /usr/local/bin/terraform

sudo chmod +x /usr/local/bin/terraform

cd -

rm -rf "$TMP_DIR"

echo
echo "Terraform installation completed."

terraform version

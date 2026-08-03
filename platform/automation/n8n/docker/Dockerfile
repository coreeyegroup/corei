FROM docker.n8n.io/n8nio/n8n:2.22.4

USER root

RUN apk add --no-cache \
    python3 \
    py3-pip

COPY requirements.txt /tmp/requirements.txt

RUN pip3 install \
    --break-system-packages \
    -r /tmp/requirements.txt

USER node

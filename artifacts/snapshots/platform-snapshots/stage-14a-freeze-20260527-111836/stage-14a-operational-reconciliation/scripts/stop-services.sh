#!/bin/bash

set -e

echo "[Stage-14A] Stopping trading-logic services..."

PID_DIR="runtime/stage-14/pids"

if [ ! -d "$PID_DIR" ]; then
    echo "[Stage-14A] PID directory not found"
    exit 0
fi

for pidfile in $PID_DIR/*.pid
do

    if [ -f "$pidfile" ]; then

        PID=$(cat "$pidfile")

        if ps -p $PID > /dev/null 2>&1
        then
            kill $PID
            echo "[PASS] Stopped PID $PID"
        else
            echo "[WARN] PID already stopped: $PID"
        fi

        rm -f "$pidfile"
    fi

done

echo "[Stage-14A] All services stopped"

#!/usr/bin/env bash

kubectl get pods -n tools

helm status penpot -n tools

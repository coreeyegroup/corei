#!/usr/bin/env bash

kubectl delete deployment penpot-postgres -n tools --ignore-not-found

kubectl delete deployment penpot-redis -n tools --ignore-not-found

kubectl delete svc penpot-postgres -n tools --ignore-not-found

kubectl delete svc penpot-redis -n tools --ignore-not-found

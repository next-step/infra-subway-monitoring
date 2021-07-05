#!/bin/bash

while [ "$(curl -s -H 'Accept: application/json' 'http://192.168.100.157:8081/actuator/health' | jq -r '.status')" != "UP" ]; do
  echo -ne "."
  sleep 1
done
echo "server is ready."
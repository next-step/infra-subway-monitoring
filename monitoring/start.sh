#!/bin/bash

SCRIPT_PATH=$(dirname "$0")

for MONITORING_SCRIPT_FILE in $(find "$SCRIPT_PATH" -type f -name '*.js'); do
  k6 run "$MONITORING_SCRIPT_FILE"
done

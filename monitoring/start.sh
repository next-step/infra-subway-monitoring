#!/bin/bash

SCRIPT_PATH=$(dirname "$0")

for MONITORING_SCRIPT_FILE in $(find "$SCRIPT_PATH" -path ./monitoring/executor -prune -o -name '*.js' -print); do
  NAME="$(basename "$MONITORING_SCRIPT_FILE" .js)"
  OUTPUT_PATH=$(dirname "$MONITORING_SCRIPT_FILE")

  mkdir -p "$OUTPUT_PATH/output"
  k6 run --out influxdb=http://localhost:8086/myk6db "$MONITORING_SCRIPT_FILE" > "$OUTPUT_PATH/output/$NAME.log"
done

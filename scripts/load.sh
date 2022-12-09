#!/bin/bash

k6 run --config load.json --out influxdb=http://localhost:8086/subwayk6db  script.js 1> load.log 2>&1 &

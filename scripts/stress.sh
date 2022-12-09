#!/bin/bash

k6 run --config stress.json --out influxdb=http://localhost:8086/subwayk6db  script.js 1> stress.log 2>&1 &

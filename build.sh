#!/bin/bash

./gradlew clean build --exclude-task test
docker build -t nextstep/spring-boot -f docker/spring-boot/Dockerfile .

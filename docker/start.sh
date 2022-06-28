#!/bin/bash

DOCKER_PATH=$(dirname "$0")

docker stop subway-monitoring
docker rm subway-monitoring

if [ "$(docker images 'subway-monitoring' -a -q)" ]; then
    docker rmi $(docker images 'subway-monitoring' -a -q)
fi

cd "$DOCKER_PATH"/../
SPRING_PROFILE_ACTIVE=test ./gradlew clean build
cp build/libs/*.jar docker/application.jar

cd docker
docker build -t subway-monitoring .
docker run -d --name subway-monitoring -p 80:8080 subway-monitoring

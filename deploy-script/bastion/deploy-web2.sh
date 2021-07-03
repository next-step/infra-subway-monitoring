#!/bin/sh

TARGET_DEPLOY_TCP=tcp://was:2375
DOCKER_APP_NAME=infra-subway2
DOCKER_HOST=${TARGET_DEPLOY_TCP} docker-compose -p ${DOCKER_APP_NAME} -f docker-compose2.yml down
DOCKER_HOST=${TARGET_DEPLOY_TCP} docker-compose -p ${DOCKER_APP_NAME} -f docker-compose2.yml pull
DOCKER_HOST=${TARGET_DEPLOY_TCP} docker-compose -p ${DOCKER_APP_NAME} -f docker-compose2.yml up -d
#!/bin/sh

TARGET_DEPLOY_TCP=tcp://was:2375
DOCKER_APP_NAME=infra-subway1
DOCKER_HOST=${TARGET_DEPLOY_TCP} docker-compose -p ${DOCKER_APP_NAME} -f docker-compose1.yml down
DOCKER_HOST=${TARGET_DEPLOY_TCP} docker-compose -p ${DOCKER_APP_NAME} -f docker-compose1.yml pull
DOCKER_HOST=${TARGET_DEPLOY_TCP} docker-compose -p ${DOCKER_APP_NAME} -f docker-compose1.yml up -d
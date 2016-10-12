#!/bin/bash

STAGE_UIAPP_VERSION=$1
DOCKERFILE_LOCATION=$2

npm install
jspm install -y
gulp clean
gulp bundle
npm prune --production

docker build -t stage/uiapp:$STAGE_UIAPP_VERSION $DOCKERFILE_LOCATION

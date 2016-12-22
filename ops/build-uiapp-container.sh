#!/bin/bash

########################################################################################################################
# Builds the UI App and then builds the Docker Image.  This docker image has the UI source code built and bundled
# within Apache HTTP and Apache is configured to serve the UI and reverse proxy to the API Server.
#
#
# Pre-Conditions:
#   1: Latest Node 4.x is installed
#   2: Run this script from the root of the project because it expects the Dockerfile at the root of the project and
#      the files it copies are relative to the root. E.g. sudo ./ops/build-uiapp-container.sh 0.1.0
#
# Arguments:
#   1: $1 STAGE_UIAPP_VERSION - The version for this application (e.g. 0.1.0).
#
########################################################################################################################

STAGE_UIAPP_VERSION=$1

npm install
jspm install -y
gulp clean
gulp bundle
npm prune --production

docker build -t stage/uiapp:$STAGE_UIAPP_VERSION .

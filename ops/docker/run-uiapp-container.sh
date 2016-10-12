#!/bin/bash

#
# Run the Stage UI with Apache Httpd in a Docker Container
# The image should have already been built.
#

# REQUIRED ENVIRONMENT VARIABLES
LOCAL_HOST_PORT=$1
STAGE_API_HOST=$2
STAGE_API_HOST_PORT=$3
STAGE_UIAPP_NAME=$4
STAGE_UIAPP_VERSION=$5

docker run -d -p $LOCAL_HOST_PORT:80 -e STAGE_HOST=$STAGE_API_HOST -e STAGE_HOST_PORT=$STAGE_API_HOST_PORT --name $STAGE_UIAPP_NAME stage/uiapp:$STAGE_UIAPP_VERSION

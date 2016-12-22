#!/bin/bash

########################################################################################################################
# Run the Stage UI App with Apache HTTP in a Docker Container
#
# Pre-Conditions:
#   1: Docker image called stage/uiapp:$STAGE_UIAPP_VERION exists
#
# Arguments (in order):
#   1: $1 LOCAL_HOST_PORT (numeric) - The HTTP Port you'll be connecting to on the host running the Docker Container.
#   2: $2 STAGE_API_HOST_NAME (host name or ip) - The Stage API Server that the UI will communicate with for data.
#   3: $3 STAGE_API_HOST_PORT (numeric) - The Stage API Server's Port that the UI will communicate with for data.
#   4: $4 STAGE_UIAPP_NAME (alphanumeric) - The name for this running container. Must be locally unique.
#   5: $5 STAGE_UIAPP_VERSION (alphanumeric) - The version for the application.  Must match the image version.
#
########################################################################################################################


LOCAL_HOST_PORT=$1
STAGE_API_HOST_NAME=$2
STAGE_API_HOST_PORT=$3
STAGE_UIAPP_NAME=$4
STAGE_UIAPP_VERSION=$5

# Add if trying to connect to services running directly on docker host
# --net="host"
# e.g. if your API was on localhost: sudo ./ops/run-uiapp-container.sh 80 127.0.0.1 3000 stage-ui 0.1.0
# you would need --net="host"

docker run -d -p $LOCAL_HOST_PORT:80 -e STAGE_API_HOST_NAME=$STAGE_API_HOST_NAME -e STAGE_API_HOST_PORT=$STAGE_API_HOST_PORT --name $STAGE_UIAPP_NAME stage/uiapp:$STAGE_UIAPP_VERSION

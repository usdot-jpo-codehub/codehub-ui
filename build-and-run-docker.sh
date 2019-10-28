#!/bin/bash
docker build -t codehub-ui:latest .
docker run --rm -d -p 8080:80 -e PROXY_PASS_URL=$PROXY_PASS_URL -e PROXY_PASS_APICC_URL=$PROXY_PASS_APICC_URL codehub-ui:latest

#!/bin/bash
docker build -t codehub-ui:latest .
docker run --rm -d -p 8080:80 -e PROXY_PASS_WEBAPI=$PROXY_PASS_WEBAPI -e PROXY_PASS_APICC=$PROXY_PASS_APICC codehub-ui:latest

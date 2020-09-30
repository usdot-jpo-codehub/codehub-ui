#!/bin/bash
docker build --build-arg SONAR_TOKEN=$SONAR_TOKEN --build-arg CODEBUILD_GIT_BRANCH=$CODEBUILD_GIT_BRANCH -t codehub-ui:latest .
docker run --rm -p 8080:80 -e PROXY_PASS_WEBAPI='proxy_pass "http://localhost:3000";' -e PROXY_PASS_APICC='proxy_pass "http://localhost:3003";' codehub-ui:latest

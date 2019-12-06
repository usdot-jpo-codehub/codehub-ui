#!/bin/bash
docker build -t codehub-ui:latest .
docker run --rm -d -p 8080:80 -e PROXY_PASS_WEBAPI='proxy_pass "http://localhost:3000";' -e PROXY_PASS_APICC='proxy_pass "http://localhost:3003";' codehub-ui:latest

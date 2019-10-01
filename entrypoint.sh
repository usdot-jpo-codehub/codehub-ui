#!/bin/bash
envsubst '${PROXY_PASS_URL}' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf
nginx -g 'daemon off;'

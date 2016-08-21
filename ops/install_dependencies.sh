#!/bin/bash

# Client UI files already copied to /opt/heimdall - see ../appspec.yml
if [ ! hash nginx 2>/dev/null ]
then
  yum -y install nginx
fi

cp -f /opt/heimdall/ops/nginx.conf /etc/nginx/nginx.conf

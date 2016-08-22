#!/bin/bash

# Client UI files already copied to /opt/heimdall - see ../appspec.yml

# If nginx is not installed then install it:
hash nginx 2>/dev/null
if [ $? != 0 ]
then
  yum -y install nginx
fi

cp -f /opt/heimdall/ops/nginx.conf /etc/nginx/nginx.conf

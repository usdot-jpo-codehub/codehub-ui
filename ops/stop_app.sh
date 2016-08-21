#!/bin/bash

# If nginx is installed then try to gracefully stop it
hash nginx 2>/dev/null
if [ $? = 0 ]
then
  nginx -s quit
fi

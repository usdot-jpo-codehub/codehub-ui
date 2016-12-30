#!/bin/bash

# If nginx is installed then try to gracefully stop it
hash docker 2>/dev/null
if [ $? = 0 ]
then
  docker stop stage-uiapp
  if [ $? -eq 0 ]
  then
    docker rm stage-uiapp
  fi
fi

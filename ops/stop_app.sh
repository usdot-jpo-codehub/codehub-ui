#!/bin/bash

if [ hash nginx 2>/dev/null ]
then
  nginx -s quit
fi

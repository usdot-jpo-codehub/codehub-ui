#!/bin/bash
#docker run -itv ~/codehub/cicd/reports:/home/chromeuser --cap-add=SYS_ADMIN dev-codehub/codehub-ui-access:latest
docker run --rm --name lighthouse -v ~/codehub/cicd/reports:/home/chrome/reports --cap-add=SYS_ADMIN dev-codehub/codehub-ui-access:latest
docker exec -it  /bin/sh -c 'lighthouse --chrome-flags="--headless --disable-gpu" http://dev-codehub-external-1278179393.us-east-1.elb.amazonaws.com --output-path=/home/chromeuser/lighthouse-report.html -y'
exit
cat ~/codehub/cicd/reports/lighthouse-report.html

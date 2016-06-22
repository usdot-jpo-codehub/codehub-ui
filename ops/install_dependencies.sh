# Client UI files already copied to /opt/heimdall - see ../appspec.yml
yum -y install nginx
cp -f /opt/heimdall/ops/nginx.conf /etc/nginx/nginx.conf

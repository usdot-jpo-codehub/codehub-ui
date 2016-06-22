# Client UI files already copied to /opt/heimdall - see ../appspec.yml
if ! command -v nginx >/dev/null 2>&1; then
  yum -y install nginx
fi
cp -f /opt/heimdall/ops/nginx.conf /etc/nginx/nginx.conf

# Client UI files already copied to /opt/heimdall - see ../appspec.yml

# if nginx not installed then install it
if command -v nginx 2 > /dev/null; then
  yum -y install nginx
fi
# Using 'command cp' since these commands are run as root and 'cp' is aliased 'cp -i'
command cp -f /opt/heimdall/ops/nginx.conf /etc/nginx/nginx.conf

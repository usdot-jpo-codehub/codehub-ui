# Client UI files already copied to /opt/heimdall - see ../appspec.yml

sudo yum -y install nginx
# Using 'command cp' since these commands are run as root and 'cp' is aliased 'cp -i'
sudo cp -f /opt/heimdall/ops/nginx.conf /etc/nginx/nginx.conf

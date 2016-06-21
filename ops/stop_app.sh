# if nginx installed then gracefully stop it
if command -v nginx 2 > /dev/null; then
  nginx -s quit
fi

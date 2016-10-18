FROM httpd:2.4-alpine
MAINTAINER Johnny Mohseni <mohseni_johnny@bah.com>

COPY ./ /usr/local/apache2/htdocs/
COPY ops/httpd.conf /usr/local/apache2/conf/httpd.conf

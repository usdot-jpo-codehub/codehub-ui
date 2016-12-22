FROM httpd:2.4-alpine
MAINTAINER Johnny Mohseni <mohseni_johnny@bah.com>

COPY ./ /usr/local/apache2/htdocs/
#COPY ops/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ops/sso/conf/ /usr/local/apache2/conf/
COPY ops/sso/modules /usr/local/apache2/modules/

RUN ln -s /lib/libssl.so.1.0.0 /lib/libssl.so.10
RUN ln -s /lib/libcrypto.so.1.0.0 /lib/libcrypto.so.10

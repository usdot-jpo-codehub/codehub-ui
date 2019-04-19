FROM nginx:1.14.1

# Get dependancies for node install
RUN apt-get update \
 && apt-get install -y -q --no-install-recommends \
    ca-certificates curl gnupg gnupg2 gnupg1 nano git bzip2 libfontconfig1-dev xz-utils \
    wget \
 && apt-get clean \
 && rm -r /var/lib/apt/lists/*

 WORKDIR /app

# Install Node
ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 8.15.0

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
#
RUN npm install
RUN npm install && \
npm install -g gulp && \
npm install -g aurelia-cli


COPY dist /app

COPY nginx.conf /etc/nginx
RUN cat /etc/nginx/nginx.conf
RUN ls -l
EXPOSE 80 9000
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod 777 /app/entrypoint.sh
CMD ["./app/entrypoint.sh"]
# Install module dependencies
CMD ["nginx", "-g", "daemon off;"]

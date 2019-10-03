FROM node:8.16.1-jessie as buildimage

# Get dependencies for node install
# RUN apt-get update \
#   && apt-get install -y -q --no-install-recommends \
#   ca-certificates curl gnupg gnupg2 gnupg1 nano git bzip2 libfontconfig1-dev xz-utils \
#   wget \
#   && apt-get clean \
#   && rm -r /var/lib/apt/lists/*

# RUN apt-get update

WORKDIR /app

# ENV NPM_CONFIG_LOGLEVEL info
# ENV NODE_VERSION 8.15.0

# RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
# RUN apt-get install -y nodejs

RUN npm install -g gulp
RUN npm install -g aurelia-cli

COPY . .

RUN npm install

RUN npm run bundle

FROM nginx:1.14.1

WORKDIR /app

COPY --from=buildimage /app/dist .

COPY --from=buildimage /app/entrypoint.sh .

COPY nginx.conf /etc/nginx

CMD ["/app/entrypoint.sh"]

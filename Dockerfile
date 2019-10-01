FROM nginx:1.14.1

# Get dependencies for node install
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

RUN npm install

COPY dist /app
COPY nginx.conf /etc/nginx
COPY entrypoint.sh /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]

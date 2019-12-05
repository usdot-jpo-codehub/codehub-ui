FROM node:8.16.1-jessie as buildimage

WORKDIR /app

RUN npm install -g gulp
RUN npm install -g aurelia-cli

COPY . .

RUN npm install

RUN npm run bundle

FROM nginx:1.14.1

WORKDIR /app

COPY --from=buildimage /app/dist .

COPY --from=buildimage /app/entrypoint.sh .

COPY nginx.template.conf /etc/nginx

CMD ["/app/entrypoint.sh"]

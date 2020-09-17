FROM node:10.20.1-jessie as buildimage

ARG CODEBUILD_GIT_BRANCH
ARG SONAR_TOKEN

WORKDIR /app

RUN npm install -g gulp
RUN npm install -g aurelia-cli

COPY . .

RUN npm install

RUN npm run bundle
RUN npm test

# for runnning local sonarqube
RUN mkdir -p /root/.sonar/sonar-scanner-4.4.0.2170-linux
RUN rm -rf /root/.sonar/sonar-scanner-4.4.0.2170-linux
RUN mkdir -p /root/.sonar/sonar-scanner-4.4.0.2170-linux
RUN curl -ksSLo /root/.sonar/sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.4.0.2170-linux.zip
RUN unzip /root/.sonar/sonar-scanner.zip -d /root/.sonar/
RUN rm /root/.sonar/sonar-scanner.zip
RUN /root/.sonar/sonar-scanner-4.4.0.2170-linux/bin/sonar-scanner -Dsonar.projectKey=usdot-jpo-codehub_codehub-ui -Dsonar.organization=usdot-jpo-codehub -Dsonar.sources=src -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=${SONAR_TOKEN} -Dsonar.branch.name=${CODEBUILD_GIT_BRANCH} -Dsonar.javascript.lcov.reportPaths=test/coverage-jest/lcov.info


FROM nginx:1.17.10

WORKDIR /app

COPY --from=buildimage /app/dist .

COPY --from=buildimage /app/entrypoint.sh .

COPY nginx.template.conf /etc/nginx

CMD ["/app/entrypoint.sh"]

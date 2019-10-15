![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoieE1PRzV1dmZyOTB5MVBIYzlGYUFKcitLUVpPVEtNd2Z3WDdraEUxYXMwQkV5SytJbk1MSitxenlqTFN1N3hqOVJ3bXRZVkFrS2paTXNnQVNkQWFVRmQwPSIsIml2UGFyYW1ldGVyU3BlYyI6Ik0ySy85bzR3OVU2eEMwUnUiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=usdot-jpo-codehub_codehub-ui&metric=alert_status)](https://sonarcloud.io/dashboard?id=usdot-jpo-codehub_codehub-ui)

# codehub-ui

This repository holds the frontend user-interface (UI) code for the United States Department of Transportation (U.S. DOT) Joint Program Office (JPO) Intelligent Transit Systems (ITS) CodeHub website located at [https://its.dot.gov/code](https://its.dot.gov/code).

## Getting Started

The CodeHub UI is a Dockerized application. While it is possible to run this application natively, we strongly recommend that you use Docker to abstract away the complications of Node version management and package installation.

### Prerequisites

- Docker Version 19.03 (or higher)

### Installing

The UI requires a running CodeHub API instance to which it can connect. See the [codehub-api repository](https://github.com/usdot-jpo-codehub/codehub-api) for instructions.

After you have the API running, you may run the CodeHub UI in Docker using the following steps:

1. Set the `PROXY_PASS_URL` environment variable to the full URL and port of your CodeHub API instance.
2. Run the `./build-and-run-docker.sh` script present in the top level of this repository.

## Running the unit tests

Unit tests are run via the aurelia-cli and use [karma](https://karma-runner.github.io) and [jasmine](https://jasmine.github.io/) as test-runners.

### To execute the unit tests, execute the following command:
```shell
au test
```

### To execute the unit in a Test Driven Development (TDD) mode:
```shell
au test --watch
```

## Running The Integration Tests

Integration tests are performed with [Protractor](http://angular.github.io/protractor/#/).

1. Place your E2E-Tests into the folder ```test/e2e/src```
2. Install the necessary webdriver.

  ```shell
  gulp webdriver-update
  ```

3. Configure the path to the webdriver by opening the file ```protractor.conf.js``` and adjusting the ```seleniumServerJar``` property. Typically its only needed to adjust the version number.

4. Make sure your app runs and is accessible

  ```shell
  au run
  ```

5. In another console run the E2E-Tests

  ```shell
  au protractor
  ```

## Deployment

Deployment of the UI is as simple as building and running the Docker image in your environment of choice.

## Built With

* [Docker](https://www.docker.com/) - Containerization Platform
* [Node](https://nodejs.org/en/) - JavaScript Runtime Environment
* [Aurelia](https://aurelia.io/) - JavaScript Web Application Framework

## Contributing

Please contribute to this repository using GitHub Pull Requests and GitHub Issues.

## Authors

The Developers of ITS CodeHub.

## License

This project is licensed under the Apache 2.0 License.

## Code.gov Registration Info

Agency: DOT
Short Description: The backend API for the ITS CodeHub repository-sharing website.
Status: Beta
Tags: transportation, connected vehicles, intelligent transportation systems, javascript, api
Labor Hours: 0
Contact Name: Brian Brotsos
Contact Phone:

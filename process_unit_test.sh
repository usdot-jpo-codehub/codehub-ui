#!/bin/bash

npm install -y
au test --browsers ChromeHeadlessNoSandbox --watch=false --code-coverage

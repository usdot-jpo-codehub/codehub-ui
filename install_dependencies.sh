#!/bin/sh

JSPM_GITHUB_AUTH_TOKEN='2fcaec9eeb9a1580f3f79edfc8abfc3943e1769f'
jspm config registries.github.remote https://github.jspm.io
jspm config registries.github.auth $JSPM_GITHUB_AUTH_TOKEN
jspm config registries.github.maxRepoSize 100
jspm config registries.github.handler jspm-github
jspm registry export github

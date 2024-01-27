const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

async function run() {
    core.notice('Hello from my custom JavaScript Action!') // core gives access to utility methods & feature like notice, which is used to log messages to the GitHub Actions workflow log
}

// run in folder ./github/actions/deploy-s3-javascript npm init -y to create package.json (node js required on machine)
// install dependencies with npm install @actions/core @actions/github @actions/exec
// docs: https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action / https://github.com/actions/toolkit
run();
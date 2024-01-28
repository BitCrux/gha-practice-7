const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

async function run() {
    // Use the defined inputs of action.yml
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true }); // Due to defined default value in action.yml it's provided here, therefore true
    const distFolder = core.getInput('dist-folder', { required: true });

    // github.getOctokit() // Package gives access to OctoKit client, which makes it easy to send request to the GitHub rest api. 
    // github.context // Also allows access to the GitHub context object

    // Upload artifacts to AWS
    // AWS is supported by ubuntu runner doc: 
    // https://github.com/actions/runner-images#available-images
    // https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2204-Readme.md
    const s3Uri = `s3://${bucket}`
    // To make this working permissions must be granted by AWS. In AWS -> Security Credentials -> Access keys -> Create new access key
    // Set environment variable in GitHub with the access key as value and access it in the workflow deploy.yml
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`) // Execute command in AWS cli tool aws s3 sync <local-folder> <s3-bucket> 
    

    core.notice('Hello from my custom JavaScript Action!') // core gives access to utility methods & feature like notice, which is used to log messages to the GitHub Actions workflow log
}

// run in folder ./github/actions/deploy-s3-javascript npm init -y to create package.json (node js required on machine)
// install dependencies with npm install @actions/core @actions/github @actions/exec
// docs: https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action / https://github.com/actions/toolkit
run();
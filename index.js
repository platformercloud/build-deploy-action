const axios = require('axios').default;
const core = require('@actions/core');
const github = require('@actions/github');

try {

    const containerID = core.getInput('container-id');
    const imageRegistryID = core.getInput('image-registry-id');
    const channel = core.getInput('channel');
    const updateType = core.getInput('update-type');
    const token = core.getInput('token');
    const payload = github.context.payload
    const domain = core.getInput('domain');
    const imageName = core.getInput('image-name');
    const tag = core.getInput('tag');
    const projectId = core.getInput('project-id');
    const organizationId = core.getInput('org-id');

    console.log(`Sending Request to Platformer API....`);
    const payload = {
        channel,
        update_type: updateType,
        image: imageName,
        tag: tag
    }

    let WebhhookURL;
    if (containerID && containerID != "") {
        payload.containerID = containerID
        WebhhookURL = `${domain}/rudder/webhook/v1/container`
    }
    if (imageRegistryID && imageRegistryID != "") {
        payload.imageRegistryID = imageRegistryID
        WebhhookURL = `${domain}/rudder/webhook/v1/image-registry`
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
        'x-project-id': projectId,
        'x-organization-id': organizationId
    }

    await axios.post(WebhhookURL, payload, {
        headers: headers
    });
    core.setOutput("platformer-status", "deployed");

} catch (error) {
    core.setOutput("platformer-status", "failed");
    core.setFailed(error.message);
}


# Platformer Build Deployer Action

This action deploys your newly built docker images to Kubernetes clusters through Platformer Console

## Inputs

### `domain`

Platformer API Domain. Default `"https://beta.api.platformer.com"`.

### `org-id`

**Required** Platformer Organization ID 


### `project-id`

**Required** Platformer Project ID 


### `image-name`

**Required** Name of your Docker Image

### `tag`

**Required** Tag of your newly built image. (If you have multiple tags, just add one of them as all of them refer to the same image blob) Default `"latest"`

### `container-id`

Application Container ID of Platformer Console. This will update the existing deployment regardless automatic deployment is enabled or not.

### `image-registry-id`

Image Registry ID of Platformer Console. This will update all related containers if they have automatic deployment feature turned on.

### `channel`

If you want to version your images according to a channel.  Default `"default"`

### `update-type`

How your image should be versioned. Supported (patch,minor,major) Default `"patch"`

### `Token`

**Required** Platformer Service Account Token to be used for this action. Please use Secrets for this.


## Example

```
  build:
    steps:
    - name: Platformer Deploy
      uses: platformer-com/build-deploy-action@v1
      with:
       org-id: ${{secrets.ORG_ID}}
       project-id: ${{secrets.PROJECT_ID}}
       token: ${{secrets.TOKEN}}
       image-name: ${{secrets.DOCKER_USER}}/${{ github.event.repository.name }} 
       tag: ${{github.sha}}
       container-id: some-container-id
```
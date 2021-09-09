# 7 - Identity <TagVersion type="version">Available from version v0.34.0</TagVersion>

## Overview
UnDistro uses [Pinniped](https://pinniped.dev) to implement AuthNZ mechanisms with some custom features.
Kubernetes has a few options for integrating user identity systems, for now, we have
support [OIDC](https://openid.net/connect), a standard, and well-known protocol-based option.

## Minimal Identity Configuration
To enable UnDistro Identity Management feature, put the following configuration into your installation config file.
We just support the automated configuration in deployment-time.
```yaml
undistro:
  identity:
    enabled: true # default is 'false'
    name: default-identity-management
    oidc:
      provider:
        issuer:
          name: gitlab # other IDPs options are 'google'
      credentials:
        clientID: <your-client-id> # replace by your IDP Client ID
        clientSecret: <your-client-secret> # replace by your IDP Client Secret
```

And then run the installation passing the file `--config` flag.

## Authenticating via CLI
```bash
$ undistro get kubeconfig --help
Get kubeconfig of a cluster created or imported by UnDistro.

Usage:
  undistro get kubeconfig [cluster name]

Examples:
# Get kubeconfig of the management cluster
$ undistro get kubeconfig management -n undistro-system
# Get kubeconfig of others clusters
$ undistro get kubeconfig cool-cluster -n cool-namespace > undistro.kubeconfig

# If are the first use of the kubeconfig file, a login screen in browser
# will be open or use `--oidc-skip-browser` flag in get kubeconfig command
# to the cli show a link to paste in browser for non-browser flows, like an remote server.
# Thus, you can copy link and paste in another machine instance with a real browser.
$ undistro get kubeconfig --oidc-skip-browser > undistro.kubeconfig

# Congratulations,you already can use the kubeconfig generated file and do authorized requests
# with you have the right permissions.
$ undistro get namespaces --kubeconfig undistro.kubeconfig
```

### Mapping an user OIDC admin permission with Kubernetes Roles
You need create a RoleBinding or ClusterRoleBinding for the target OIDC user as follows

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cluster-admin-it-afdeling
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - apiGroup: rbac.authorization.k8s.io
    kind: User
    name: newuser
```

## Authenticating via UnDistro API
We offer a way to authenticate using a _/login?idp=gitlab_ endpoint, specifying the Identity Provider via
the query param of the request. Fow now, we support both Gitlab and Google. In this endpoint, you will be
redirected to the IDP system to self identity and then return to UnDistro.
Then, call _/authcluster?name=management&namespace=undistro-system_ passing the name and namespace of the
cluster via query params to retrieve the Exec Credential for authorizing your requests.
To clean the user session, a _/logout_ endpoint is avaiable.

## Authenticating via Web UI (Comming soon)
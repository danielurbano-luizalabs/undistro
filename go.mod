module github.com/getupio-undistro/undistro

go 1.16

require (
	github.com/Azure/azure-sdk-for-go v16.2.1+incompatible
	github.com/Azure/go-autorest/autorest v0.11.18
	github.com/Azure/go-autorest/autorest/azure/auth v0.5.8
	github.com/Azure/go-autorest/autorest/to v0.4.0 // indirect
	github.com/MakeNowJust/heredoc/v2 v2.0.1
	github.com/Masterminds/semver/v3 v3.1.1
	github.com/Masterminds/sprig/v3 v3.2.2
	github.com/aws/aws-sdk-go v1.40.13
	github.com/coreos/go-oidc/v3 v3.0.0
	github.com/go-ldap/ldap/v3 v3.3.0
	github.com/go-logr/logr v0.4.0
	github.com/go-logr/stdr v0.4.0
	github.com/go-task/slim-sprig v0.0.0-20210107165309-348f09dbbbc0
	github.com/gofrs/flock v0.8.1
	github.com/gorilla/mux v1.8.0
	github.com/gorilla/securecookie v1.1.1
	github.com/json-iterator/go v1.1.11
	github.com/onsi/ginkgo v1.16.4
	github.com/onsi/gomega v1.14.0
	github.com/ory/fosite v0.40.2
	github.com/pkg/browser v0.0.0-20210115035449-ce105d075bb4
	github.com/pkg/errors v0.9.1
	github.com/smallstep/truststore v0.9.6
	github.com/spf13/cobra v1.2.1
	github.com/spf13/pflag v1.0.5
	github.com/stretchr/testify v1.7.0
	github.com/tdewolff/minify/v2 v2.9.21
	go.pinniped.dev v0.10.0
	golang.org/x/oauth2 v0.0.0-20210628180205-a41e5a781914
	golang.org/x/text v0.3.6
	gopkg.in/square/go-jose.v2 v2.6.0
	helm.sh/helm/v3 v3.6.3
	k8s.io/api v0.22.1
	k8s.io/apiextensions-apiserver v0.22.1
	k8s.io/apimachinery v0.22.1
	k8s.io/apiserver v0.22.1
	k8s.io/cli-runtime v0.22.1
	k8s.io/client-go v0.22.1
	k8s.io/component-base v0.22.1
	k8s.io/gengo v0.0.0-20210203185629-de9496dff47b
	k8s.io/klog/v2 v2.10.0
	k8s.io/kube-aggregator v0.22.1
	k8s.io/kubectl v0.22.1
	k8s.io/utils v0.0.0-20210802155522-efc7438f0176
	rsc.io/letsencrypt v0.0.3 // indirect
	sigs.k8s.io/cluster-api v0.4.2
	sigs.k8s.io/cluster-api/test/framework v0.0.0-20200304170348-97097699f713
	sigs.k8s.io/controller-runtime v0.9.6
	sigs.k8s.io/yaml v1.2.0
)

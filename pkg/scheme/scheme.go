/*
Copyright 2020-2021 The UnDistro authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package scheme

import (
	appv1alpha1 "github.com/getupio-undistro/undistro/apis/app/v1alpha1"
	metadatav1alpha1 "github.com/getupio-undistro/undistro/apis/metadata/v1alpha1"
	v1alpha1conciergeauth "go.pinniped.dev/generated/latest/apis/concierge/authentication/v1alpha1"
	v1alpha1supervisorconf "go.pinniped.dev/generated/latest/apis/supervisor/config/v1alpha1"
	v1alpha1supervisoridp "go.pinniped.dev/generated/latest/apis/supervisor/idp/v1alpha1"
	apiextensionsv1 "k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1"
	"k8s.io/apimachinery/pkg/runtime"
	utilruntime "k8s.io/apimachinery/pkg/util/runtime"
	clientgoscheme "k8s.io/client-go/kubernetes/scheme"
	capi "sigs.k8s.io/cluster-api/api/v1alpha4"
	capicp "sigs.k8s.io/cluster-api/controlplane/kubeadm/api/v1alpha4"
	capiexp "sigs.k8s.io/cluster-api/exp/api/v1alpha4"
	ctrl "sigs.k8s.io/controller-runtime"
)

var (
	Scheme = runtime.NewScheme()
)

func init() {
	utilruntime.Must(clientgoscheme.AddToScheme(Scheme))
	utilruntime.Must(appv1alpha1.AddToScheme(Scheme))
	utilruntime.Must(metadatav1alpha1.AddToScheme(Scheme))
	utilruntime.Must(capi.AddToScheme(Scheme))
	utilruntime.Must(capicp.AddToScheme(Scheme))
	utilruntime.Must(apiextensionsv1.AddToScheme(Scheme))
	utilruntime.Must(capiexp.AddToScheme(Scheme))
	err := v1alpha1supervisoridp.AddToScheme(Scheme)
	if err != nil {
		ctrl.Log.V(2).Info("identity disabled", "err", err)
	}
	err = v1alpha1supervisorconf.AddToScheme(Scheme)
	if err != nil {
		ctrl.Log.V(2).Info("identity disabled", "err", err)
	}
	err = v1alpha1conciergeauth.AddToScheme(Scheme)
	if err != nil {
		ctrl.Log.V(2).Info("identity disabled", "err", err)
	}
	// +kubebuilder:scaffold:scheme
}

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
package kube

import (
	"context"

	appv1alpha1 "github.com/getupio-undistro/undistro/apis/app/v1alpha1"
	"github.com/getupio-undistro/undistro/pkg/kube/internal/coredns"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

func EnsureComponentsConfig(ctx context.Context, r client.Client, cl *appv1alpha1.Cluster) error {
	c, err := NewClusterClient(ctx, r, cl.Name, cl.Namespace)
	if err != nil {
		return err
	}
	// coredns
	err = coredns.EnsureComponentsConfig(ctx, c)
	if err != nil {
		return err
	}
	return nil
}

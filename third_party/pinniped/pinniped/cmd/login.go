// Copyright 2020-2021 the Pinniped contributors. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"github.com/spf13/cobra"
	clientauthv1beta1 "k8s.io/client-go/pkg/apis/clientauthentication/v1beta1"
	"k8s.io/client-go/tools/auth/exec"
)

//nolint: gochecknoglobals
var LoginCmd = &cobra.Command{
	Use:          "login",
	Short:        "Login to a Undistro Cluster",
	Long:         "Login to a Undistro Cluster",
	SilenceUsage: true, // Do not print usage message when commands fail.
}

func loadClusterInfo() *clientauthv1beta1.Cluster {
	obj, _, err := exec.LoadExecCredentialFromEnv()
	if err != nil {
		return nil
	}
	cred, ok := obj.(*clientauthv1beta1.ExecCredential)
	if !ok {
		return nil
	}
	return cred.Spec.Cluster
}

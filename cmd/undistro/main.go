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
package main

import (
	"context"
	"os"

	"github.com/getupio-undistro/undistro/pkg/cli"
	"github.com/pkg/browser"
	_ "k8s.io/client-go/plugin/pkg/client/auth"
)

//nolint: gochecknoinits
func init() {
	// browsers like chrome like to write to our std out which breaks our JSON ExecCredential output
	// thus we redirect the browser's std out to our std err
	browser.Stdout = os.Stderr
}

func main() {
	cmd := cli.NewUndistroCommand(os.Stdin, os.Stdout, os.Stderr)
	if err := cmd.ExecuteContext(context.Background()); err != nil {
		// Do not log here because cobra already log the error
		os.Exit(1)
	}
}

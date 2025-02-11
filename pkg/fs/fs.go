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
package fs

import (
	"embed"
	"io/fs"
	"net/http"
	"os"
	"path"
)

//go:embed clustertemplates
var FS embed.FS

//go:generate helm package -u ../../charts/metallb -d chart
//go:generate helm package -u ../../charts/cert-manager -d chart
//go:generate helm package -u ../../charts/cluster-api -d chart
//go:generate helm package -u ../../charts/ingress-nginx -d chart
//go:generate helm package -u ../../charts/undistro -d chart
//go:generate helm package -u ../../charts/undistro-aws -d chart
//go:generate helm package -u ../../charts/undistro-openstack -d chart
//go:embed chart
var ChartFS embed.FS

//go:embed frontend
var frontFS embed.FS

//go:embed defaultarch
var DefaultArchFS embed.FS

//go:embed policies
var PoliciesFS embed.FS

type fsFunc func(name string) (fs.File, error)

func (f fsFunc) Open(name string) (fs.File, error) {
	return f(name)
}

// ReactHandler returns an http.Handler that will serve files from the frontFS embed.FS.
// When locating a file, it will strip the given prefix from the request and prepend the
// root to the filesystem lookup: typical prefix might be "" and root would be frontend.
func ReactHandler(prefix, root string) http.Handler {
	handler := fsFunc(func(name string) (fs.File, error) {
		assetPath := path.Join(root, name)

		// If we can't find the asset, return the default index.html content
		f, err := frontFS.Open(assetPath)
		if os.IsNotExist(err) {
			return frontFS.Open("frontend/index.html")
		}

		// Otherwise assume this is a legitimate request routed correctly
		return f, err
	})

	return http.StripPrefix(prefix, http.FileServer(http.FS(handler)))
}

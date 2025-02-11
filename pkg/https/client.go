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

package https

import (
	"crypto/tls"
	"crypto/x509"
	"net/http"
)

func NewClient(cert, key, ca string) (*http.Client, error) {
	c, err := tls.X509KeyPair([]byte(cert), []byte(key))
	if err != nil {
		return nil, err
	}
	pool := x509.NewCertPool()
	pool.AppendCertsFromPEM([]byte(ca))
	cfg := &tls.Config{}
	cfg.Certificates = append(cfg.Certificates, c)
	cfg.RootCAs = pool
	return &http.Client{
		Transport: &http.Transport{
			TLSClientConfig: cfg,
		},
	}, nil
}

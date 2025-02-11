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
package apiserver

import (
	"context"
	"io"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/caarlos0/httperr"
	"github.com/getupio-undistro/undistro/pkg/fs"
	"github.com/getupio-undistro/undistro/pkg/undistro/apiserver/health"
	"github.com/getupio-undistro/undistro/pkg/undistro/apiserver/proxy"
	"github.com/getupio-undistro/undistro/third_party/pinniped/authnz"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	"k8s.io/client-go/rest"
	"k8s.io/klog/v2"
)

type Server struct {
	genericclioptions.IOStreams
	*http.Server
	K8sCfg        *rest.Config
	HealthHandler health.Handler
}

func NewServer(cfg *rest.Config, in io.Reader, out, errOut io.Writer, healthChecks ...health.Checker) *Server {
	streams := genericclioptions.IOStreams{
		In:     in,
		Out:    out,
		ErrOut: errOut,
	}
	router := mux.NewRouter()
	apiServer := &Server{
		IOStreams: streams,
		Server: &http.Server{
			ReadTimeout:  30 * time.Minute,
			WriteTimeout: 30 * time.Second,
			IdleTimeout:  30 * time.Minute,
		},
		K8sCfg: cfg,
	}
	for _, c := range healthChecks {
		apiServer.HealthHandler.Add(c)
	}
	apiServer.routes(router)
	apiServer.Handler = router
	apiServer.Handler = handlers.CombinedLoggingHandler(out, apiServer.Handler)
	return apiServer
}

func (s *Server) routes(router *mux.Router) {
	proxyHandler := proxy.NewHandler(s.K8sCfg)
	authNZHandlerState := authnz.SetRestConfHandlerState(s.K8sCfg)
	callbackHandler := httperr.NewF(authNZHandlerState.HandleAuthCodeCallback)
	loginHandler := httperr.NewF(authNZHandlerState.HandleLogin)
	authClusterHandler := httperr.NewF(authNZHandlerState.HandleAuthCluster)
	logoutHandler := httperr.NewF(authNZHandlerState.HandleLogout)
	authenticatedProxy := httperr.NewF(proxy.Authenticated)

	router.Handle("/healthz/readiness", &s.HealthHandler)
	router.HandleFunc("/healthz/liveness", health.HandleLive)
	router.Handle("/callback", callbackHandler).Methods(http.MethodGet)
	router.Handle("/login", loginHandler).Methods(http.MethodGet)
	router.Handle("/authcluster", authClusterHandler).Methods(http.MethodGet)
	router.Handle("/logout", logoutHandler).Methods(http.MethodGet)
	router.PathPrefix("/uapi/v1/namespaces/{namespace}/clusters/{cluster}/proxy/").Handler(proxyHandler)
	router.PathPrefix("/_").Handler(authenticatedProxy)
	router.PathPrefix("/").Handler(fs.ReactHandler("", "frontend"))
}

func (s *Server) GracefullyStart(ctx context.Context, addr string) error {
	s.Addr = addr
	cerr := make(chan error, 1)
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)
	go func(ctx context.Context) {
		klog.Infof("listen on %s", addr)
		cerr <- s.ListenAndServe()
	}(ctx)
	select {
	case <-sigCh:
		return s.Shutdown(ctx)
	case err := <-cerr:
		if err != http.ErrServerClosed {
			return err
		}
		return nil
	}
}

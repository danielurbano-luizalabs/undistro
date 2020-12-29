/*
Copyright 2020 The UnDistro authors

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
package predicate

import (
	"github.com/getupio-undistro/undistro/pkg/meta"
	"sigs.k8s.io/controller-runtime/pkg/event"
	"sigs.k8s.io/controller-runtime/pkg/predicate"
)

type Changed struct {
	predicate.Funcs
}

// Update implements the default UpdateEvent filter for validating
// source changes.
func (Changed) Update(e event.UpdateEvent) bool {
	if e.ObjectNew.GetGeneration() != e.ObjectOld.GetGeneration() {
		return true
	}

	// handle force sync
	if val, ok := meta.ReconcileAnnotationValue(e.ObjectNew.GetAnnotations()); ok {
		if valOld, okOld := meta.ReconcileAnnotationValue(e.ObjectOld.GetAnnotations()); okOld {
			return val != valOld
		}
		return true
	}
	return false
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import * as k8s from '@kubernetes/client-node'
import * as request from 'request'

import { clusterDataHandler } from '@/helpers/dataFetching'
import { getIdentityProvider, isIdentityEnabled } from '@/helpers/identity'
import { Cluster } from '@/lib/cluster'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Cluster[]>) {
  let clusters = []

  const opts = {
    url: req.url
  } as request.Options

  if (isIdentityEnabled()) {
    const session = await getSession({ req })

    if (session) {
      let username
      switch (getIdentityProvider()) {
        case 'gitlab':
          username = session.user.name
          break
        case 'google':
          username = session.user.email
          break
      }

      if (session) opts.headers = { 'Impersonate-User': username }
    }
  }

  const kc = new k8s.KubeConfig()
  kc.loadFromDefault()
  kc.applyToRequest(opts)

  request.get(
    `${kc.getCurrentCluster().server}/apis/app.undistro.io/v1alpha1/clusters`,
    opts,
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        res.status(response.statusCode).json(body)
      }
      if (response) {
        clusters = clusterDataHandler(JSON.parse(body))
        res.status(200).json(clusters)
      }
    }
  )
}

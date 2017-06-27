import React from 'react'
import { pipe, map, mapObjIndexed, values, mergeAll } from 'ramda'

import RemoteAuthenticationButton from './RemoteAuthenticationButton'

import config from '../../config/default'
const remoteAuthenticationMethods = config.authentication.remote

function RemoteAuthenticationButtons (allProps) {
  const { styles } = allProps

  const buttons = pipe(
    mapObjIndexed((method, name) => {
      const methodProps = mergeAll([method, { name }, allProps])
      return <RemoteAuthenticationButton {...methodProps} />
    }),
    values
  )(remoteAuthenticationMethods)

  const buttonItems = map(button => (
    <li className={styles.remote}>{button}</li>
  ))

  return (
    <ul className={styles.remotes}>
      {buttonItems(buttons)}
    </ul>
  )
}


export default RemoteAuthenticationButtons

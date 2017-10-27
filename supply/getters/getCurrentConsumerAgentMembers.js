import { createSelector } from 'reselect'
import { pipe, prop, map, ifElse, isNil } from 'ramda'

import getCurrentConsumerAgent from './getCurrentConsumerAgent'

export default createSelector(
  getCurrentConsumerAgent,
  ifElse(
    isNil,
    () => [],
    pipe(
      prop('members'),
      map(prop('agent'))
    )
  )
)

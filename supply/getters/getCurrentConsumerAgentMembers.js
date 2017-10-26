import { createSelector } from 'reselect'
import { pipe, prop, map } from 'ramda'

import getCurrentConsumerAgent from './getCurrentConsumerAgent'

export default createSelector(
  getCurrentConsumerAgent,
  pipe(
    prop('members'),
    map(prop('agent'))
  )
)

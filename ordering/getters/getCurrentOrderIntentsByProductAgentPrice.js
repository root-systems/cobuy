import { createSelector } from 'reselect'
import { pipe, prop, map } from 'ramda'

import getOrderIntentsByOrderProductAgentPrice from './getOrderIntentsByOrderProductAgentPrice'
import getCurrentOrderId from './getCurrentOrderId'

export default createSelector(
  getCurrentOrderId,
  getOrderIntentsByOrderProductAgentPrice,
  pipe(
    prop,
    map
  )
)

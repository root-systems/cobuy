import { createSelector } from 'reselect'
import { pipe, prop, defaultTo } from 'ramda'

import getHasOrderIntentByOrderProductAgent from './getHasOrderIntentByOrderProductAgent'
import getCurrentOrderId from './getCurrentOrderId'

export default createSelector(
  getCurrentOrderId,
  getHasOrderIntentByOrderProductAgent,
  pipe(
    prop,
    defaultTo({})
  )
)

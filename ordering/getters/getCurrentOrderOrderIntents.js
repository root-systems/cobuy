import { createSelector } from 'reselect'
import { prop } from 'ramda'

import getOrderIntentsByOrderId from './getOrderIntentsByOrderId'
import getCurrentOrderId from './getCurrentOrderId'

export default createSelector(
  getCurrentOrderId,
  getOrderIntentsByOrderId,
  prop
)

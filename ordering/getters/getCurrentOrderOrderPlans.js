import { createSelector } from 'reselect'
import { prop } from 'ramda'

import getOrderPlansByOrderId from './getOrderPlansByOrderId'
import getCurrentOrderId from './getCurrentOrderId'

export default createSelector(
  getCurrentOrderId,
  getOrderPlansByOrderId,
  prop
)

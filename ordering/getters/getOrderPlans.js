import { createSelector } from 'reselect'
import { values, pipe, map, filter, groupBy, prop, merge } from 'ramda'

import getRawOrderPlans from './getRawOrderPlans'
import getPriceSpecs from '../../supply/getters/getPriceSpecs'

export default createSelector(
  getRawOrderPlans,
  getPriceSpecs,
  (orderPlans, priceSpecs) => {
    return map((orderPlan) => {
      return merge(orderPlan, { priceSpec: priceSpecs[orderPlan.priceSpecId] })
    }, orderPlans)
  }
)

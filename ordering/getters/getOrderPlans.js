import { createSelector } from 'reselect'
import { values, pipe, map, filter, groupBy, prop, merge } from 'ramda'

import getRawOrderPlans from './getRawOrderPlans'
import getPriceSpecs from '../../supply/getters/getPriceSpecs'

export default createSelector(
  getRawOrderPlans,
  getPriceSpecs,
  //Still to create
  getAgentsInCurrentOrderGroup,
  (orderPlans, priceSpecs, agents) => {
    return map((orderPlan) => {
      return merge(orderPlan, { priceSpec: priceSpecs[orderPlan.priceSpecId], agent: agents[orderPlan.agentId] })
    }, orderPlans)
  }
)

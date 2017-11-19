import { createSelector } from 'reselect'
import { values, pipe, map, filter, groupBy, prop, merge } from 'ramda'

import getRawOrderPlans from './getRawOrderPlans'
import getPriceSpecs from '../../supply/getters/getPriceSpecs'
import getProducts from '../../supply/getters/getProducts'
import { getAgents } from 'dogstack-agents/getters'

export default createSelector(
  getRawOrderPlans,
  getPriceSpecs,
  getProducts,
  getAgents,
  (orderPlans, priceSpecs, products, agents) => {
    return map((orderPlan) => {
      const { priceSpecId, agentId, productId } = orderPlan
      return merge(orderPlan, { priceSpec: priceSpecs[priceSpecId], agent: agents[agentId], product: products[productId] })
    }, orderPlans)
  }
)

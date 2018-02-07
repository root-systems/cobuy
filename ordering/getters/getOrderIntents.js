import { createSelector } from 'reselect'
import { map, merge } from 'ramda'

import getRawOrderIntents from './getRawOrderIntents'
import getPriceSpecs from '../../supply/getters/getPriceSpecs'
import getProducts from '../../supply/getters/getProducts'
import { getAgents } from 'dogstack-agents/getters'

export default createSelector(
  getRawOrderIntents,
  getPriceSpecs,
  getProducts,
  getAgents,
  (orderIntents, priceSpecs, products, agents) => {
    return map((orderIntent) => {
      const { priceSpecId, agentId, productId } = orderIntent
      return merge(orderIntent, { priceSpec: priceSpecs[priceSpecId], agent: agents[agentId], product: products[productId] })
    }, orderIntents)
  }
)

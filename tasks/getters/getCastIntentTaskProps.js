import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getProducts from '../../supply/getters/getProducts'
import getResourceTypes from '../../resources/getters/getResourceTypes'
import getPriceSpecs from '../../supply/getters/getPriceSpecsByProduct'
import getRouterParams from '../../app/getters/getRouterParams'
import getOrderIntents from '../../ordering/getters/getOrderIntents'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  products: getProducts,
  resourceTypes: getResourceTypes,
  priceSpecs: getPriceSpecs,
  routerParams: getRouterParams,
  orderIntents: getOrderIntents
})

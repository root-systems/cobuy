import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getProducts from '../../supply/getters/getProducts'
import getResourceTypes from '../../resources/getters/getResourceTypes'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  products: getProducts,
  resourceTypes: getResourceTypes
})

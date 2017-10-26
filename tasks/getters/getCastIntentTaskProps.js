import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getOrderAgents from '../../supply/getters/getCurrentConsumerAgentMembers'
import getCurrentOrder from '../../ordering/getters/getCurrentOrder'
import getCurrentOrderProducts from '../../supply/getters/getCurrentSupplierProducts'
import getCurrentProduct from '../../supply/getters/getCurrentProduct'
import getResourceTypes from '../../resources/getters/getResourceTypes'
import getPriceSpecs from '../../supply/getters/getPriceSpecs'
import getCurrentOrderIntentsByProductAgentPrice from '../../ordering/getters/getCurrentOrderIntentsByProductAgentPrice'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  order: getCurrentOrder,
  agents: getOrderAgents,
  products: getCurrentOrderProducts,
  product: getCurrentProduct,
  orderIntentsByProductAgentPrice: getCurrentOrderIntentsByProductAgentPrice
})

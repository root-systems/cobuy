import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getOrderAgents from '../../supply/getters/getCurrentConsumerAgentMembers'
import getCurrentOrder from '../../ordering/getters/getCurrentOrder'
import getCurrentOrderProducts from '../../supply/getters/getCurrentSupplierProducts'
import getCurrentProduct from '../../supply/getters/getCurrentProduct'
import getResourceTypes from '../../resources/getters/getResourceTypes'
import getPriceSpecs from '../../supply/getters/getPriceSpecs'
import getCurrentOrderIntentsByProductPriceAgent from '../../ordering/getters/getCurrentOrderIntentsByProductPriceAgent'
import getCurrentOrderApplicablePriceSpecByProduct from '../../ordering/getters/getCurrentOrderApplicablePriceSpecByProduct'
import getCurrentOrderCollectiveQuantityByProduct from '../../ordering/getters/getCurrentOrderCollectiveQuantityByProduct'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  order: getCurrentOrder,
  agents: getOrderAgents,
  products: getCurrentOrderProducts,
  product: getCurrentProduct,
  priceSpecs: getPriceSpecs,
  orderIntentsByProductPriceAgent: getCurrentOrderIntentsByProductPriceAgent,
  applicablePriceSpecByProduct: getCurrentOrderApplicablePriceSpecByProduct,
  collectiveQuantityByProduct: getCurrentOrderCollectiveQuantityByProduct
})

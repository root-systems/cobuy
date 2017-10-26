import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentOrder from '../../ordering/getters/getCurrentOrder'
import getCurrentOrderProducts from '../../supply/getters/getCurrentSupplierProducts'
import getCurrentProduct from '../../supply/getters/getCurrentProduct'
import getResourceTypes from '../../resources/getters/getResourceTypes'
import getPriceSpecs from '../../supply/getters/getPriceSpecsByProduct'
import getCurrentOrderIntentsByProductAgentPrice from '../../ordering/getters/getCurrentOrderIntentsByProductAgentPrice'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  order: getCurrentOrder,
  products: getCurrentOrderProducts,
  product: getCurrentProduct,
  resourceTypes: getResourceTypes,
  priceSpecs: getPriceSpecs,
  orderIntentsByProductAgentPrice: getCurrentOrderIntentsByProductAgentPrice
})

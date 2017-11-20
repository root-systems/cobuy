import { createStructuredSelector } from 'reselect'
import getCurrentOrder from '../../ordering/getters/getCurrentOrder'
import getCurrentOrderOrderPlansByAgent from '../../ordering/getters/getCurrentOrderOrderPlansByAgent'
import getSummedOrderPlansPerProduct from '../../ordering/getters/getSummedOrderPlansPerProduct'

export default createStructuredSelector({
  currentOrder: getCurrentOrder,
  currentOrderOrderPlansByAgent: getCurrentOrderOrderPlansByAgent,
  summedOrderPlansPerProduct: getSummedOrderPlansPerProduct
})

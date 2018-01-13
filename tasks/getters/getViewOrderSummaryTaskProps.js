import { createStructuredSelector } from 'reselect'
import getCurrentOrderOrderPlansByAgent from '../../ordering/getters/getCurrentOrderOrderPlansByAgent'
import getCurrentOrder from '../../ordering/getters/getCurrentOrder'

export default createStructuredSelector({
  currentOrderOrderPlansByAgent: getCurrentOrderOrderPlansByAgent,
  currentOrder: getCurrentOrder
})

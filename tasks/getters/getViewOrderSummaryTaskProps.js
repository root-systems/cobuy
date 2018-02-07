import { createStructuredSelector } from 'reselect'
import getCurrentOrderOrderPlansByAgent from '../../ordering/getters/getCurrentOrderOrderPlansByAgent'
import getCurrentOrderOrderIntentsByAgent from '../../ordering/getters/getCurrentOrderOrderIntentsByAgent'
import getCurrentOrder from '../../ordering/getters/getCurrentOrder'

export default createStructuredSelector({
  currentOrderOrderPlansByAgent: getCurrentOrderOrderPlansByAgent,
  currentOrder: getCurrentOrder,
  currentOrderOrderIntentsByAgent: getCurrentOrderOrderIntentsByAgent
})

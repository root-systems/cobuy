import { createStructuredSelector } from 'reselect'
import getCurrentOrderOrderPlansByAgent from '../../ordering/getters/getCurrentOrderOrderPlansByAgent'

export default createStructuredSelector({
  currentOrderOrderPlansByAgent: getCurrentOrderOrderPlansByAgent
})

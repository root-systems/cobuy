import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentOrderOrderPlansByAgent from '../../ordering/getters/getCurrentOrderOrderPlansByAgent'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  currentOrderOrderPlansByAgent: getCurrentOrderOrderPlansByAgent
})

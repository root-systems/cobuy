import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentOrderOrderPlans from '../../ordering/getters/getCurrentOrder'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  currentOrderPlans: getCurrentOrderOrderPlans
})

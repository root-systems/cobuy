import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentOrderOrderPlans from '../../ordering/getters/getCurrentOrderOrderPlans'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  currentOrderOrderPlans: getCurrentOrderOrderPlans
})

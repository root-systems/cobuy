import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'
import getCurrentOrder from '../../ordering/getters/getCurrentOrder'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  currentOrder: getCurrentOrder
})

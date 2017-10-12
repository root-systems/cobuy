import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

export default createStructuredSelector({
  currentAgent: getCurrentAgent,
  products: (state) => { return state.products },
  resourceTypes: (state) => { return state.resourceTypes}
})

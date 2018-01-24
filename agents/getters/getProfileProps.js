import { createStructuredSelector } from 'reselect'

import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

export default createStructuredSelector({
  agent: getCurrentAgent
})

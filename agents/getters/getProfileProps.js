import { createStructuredSelector } from 'reselect'
import getCurrentAgent from 'dogstack-agents/agents/getters/getCurrentAgent'

import getCurrentProfile from './getCurrentProfile'

const getOrderPageProps = createStructuredSelector({
  currentAgent: getCurrentAgent,
  profile: getCurrentProfile
})

export default getOrderPageProps

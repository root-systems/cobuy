import { createStructuredSelector } from 'reselect'

import getCurrentProfile from './getCurrentProfile'
import getRelatedAgent from './getRelatedAgent'
import getRelationshipsForThisAgent from './getRelationshipsForThisAgent'
import getTypeForThisAgent from './getTypeForThisAgent'

const getProfileProps = createStructuredSelector({
  currentProfile: getCurrentProfile,
  relatedAgent: getRelatedAgent,
  relationshipsForThisAgent: getRelationshipsForThisAgent,
  agentType: getTypeForThisAgent
})

export default getProfileProps

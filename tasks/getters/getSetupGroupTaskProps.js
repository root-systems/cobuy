import { createStructuredSelector } from 'reselect'

import getRelationshipsByMemberAgentId from './getRelationshipsByMemberAgentId'

export default createStructuredSelector({
  relationshipsByMemberAgentId: getRelationshipsByMemberAgentId
})

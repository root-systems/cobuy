import { createStructuredSelector } from 'reselect'

// import getRelationshipsByMemberAgentId from '../../agents/getters/getRelationshipsByMemberAgentId'
import getRelationships from '../../agents/getters/getRelationships'

export default createStructuredSelector({
  relationships: getRelationships
})

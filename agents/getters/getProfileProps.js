import { createStructuredSelector } from 'reselect'

import getCurrentProfile from './getCurrentProfile'
import getRelatedAgent from './getRelatedAgent'
import getRelationshipsForThisAgent from './getRelationshipsForThisAgent'
import getTypeForThisAgent from './getTypeForThisAgent'
import getRelatedAgentBuyingGroupIds from './getRelatedAgentBuyingGroupIds'
import getRelatedAgentBuyingGroupProfiles from './getRelatedAgentBuyingGroupProfiles'
import getCurrentSupplierProductsBasedOnProfile from '../../supply/getters/getCurrentSupplierProductsBasedOnProfile'
import getResourceTypesBasedOnProfile from '../../resources/getters/getResourceTypesBasedOnProfile'
import getRelatedMemberAgentIds from './getRelatedMemberAgentIds'
import getRelationshipsByMemberAgentId from './getRelationshipsByMemberAgentId'

const getProfileProps = createStructuredSelector({
  currentProfile: getCurrentProfile,
  relatedAgent: getRelatedAgent,
  relationshipsForThisAgent: getRelationshipsForThisAgent,
  buyingGroupIds: getRelatedAgentBuyingGroupIds,
  buyingGroupProfiles: getRelatedAgentBuyingGroupProfiles,
  agentType: getTypeForThisAgent,
  products: getCurrentSupplierProductsBasedOnProfile,
  resourceTypes: getResourceTypesBasedOnProfile,
  memberAgentIds: getRelatedMemberAgentIds,
  memberRelationships: getRelationshipsByMemberAgentId
})

export default getProfileProps

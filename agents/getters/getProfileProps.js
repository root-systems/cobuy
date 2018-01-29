import { createStructuredSelector } from 'reselect'

import getCurrentProfile from './getCurrentProfile'
import getRelatedAgent from './getRelatedAgent'
import getRelationshipsForThisAgent from './getRelationshipsForThisAgent'
import getTypeForThisAgent from './getTypeForThisAgent'
import getCurrentSupplierProductsBasedOnProfile from '../../supply/getters/getCurrentSupplierProductsBasedOnProfile'
import getResourceTypesBasedOnProfile from '../../resources/getters/getResourceTypesBasedOnProfile'

const getProfileProps = createStructuredSelector({
  currentProfile: getCurrentProfile,
  relatedAgent: getRelatedAgent,
  relationshipsForThisAgent: getRelationshipsForThisAgent,
  agentType: getTypeForThisAgent,
  products: getCurrentSupplierProductsBasedOnProfile,
  resourceTypes: getResourceTypesBasedOnProfile
})

export default getProfileProps

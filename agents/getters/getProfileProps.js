import { createStructuredSelector } from 'reselect'

import getCurrentProfile from './getCurrentProfile'
import getRelatedAgent from './getRelatedAgent'
import getRelationshipsForThisAgent from './getRelationshipsForThisAgent'
import getTypeForThisAgent from './getTypeForThisAgent'
import getCurrentSupplierProductsBasedOnProfile from '../../supply/getters/getCurrentSupplierProductsBasedOnProfile'

const getProfileProps = createStructuredSelector({
  currentProfile: getCurrentProfile,
  relatedAgent: getRelatedAgent,
  relationshipsForThisAgent: getRelationshipsForThisAgent,
  agentType: getTypeForThisAgent,
  products: getCurrentSupplierProductsBasedOnProfile
})

export default getProfileProps

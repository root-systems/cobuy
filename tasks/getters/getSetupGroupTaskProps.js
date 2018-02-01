import { createStructuredSelector } from 'reselect'

import getRelationships from '../../agents/getters/getRelationships'

export default createStructuredSelector({
  relationships: getRelationships
})

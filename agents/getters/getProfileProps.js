import { createStructuredSelector } from 'reselect'

import getCurrentProfile from './getCurrentProfile'
import getRelatedAgent from './getRelatedAgent'

const getProfileProps = createStructuredSelector({
  currentProfile: getCurrentProfile,
  relatedAgent: getRelatedAgent
})

export default getProfileProps

import { createStructuredSelector } from 'reselect'

import getCurrentProfile from './getCurrentProfile'

const getProfileProps = createStructuredSelector({
  profile: getCurrentProfile
})

export default getProfileProps

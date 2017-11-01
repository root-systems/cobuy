import { createStructuredSelector } from 'reselect'

import getConfig from './getConfig'

export default createStructuredSelector({
  config: getConfig
})

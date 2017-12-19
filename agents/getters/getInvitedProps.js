import { createStructuredSelector } from 'reselect'

import getConfig from '../../app/getters/getConfig'

export default createStructuredSelector({
  config: getConfig
})

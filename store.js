import { devToolsEnhancer } from 'redux-devtools-extension'

import updater from './updater'
import epic from './epic'

export default {
  updater,
  epic,
  enhancers: [
    devToolsEnhancer()
  ]
}

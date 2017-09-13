import { devToolsEnhancer } from 'redux-devtools-extension'

import updater from './updater'
import epic from './epic'

export default {
  updater,
  epic,
  middlewares: [
//    debug
  ],
  enhancers: [
    devToolsEnhancer()
  ]
}

function debug ({ getState }) {
  return next => action => {
    const nextValue = next(action)
    debugger
    return nextValue
  }
}

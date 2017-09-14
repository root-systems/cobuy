import updater from './updater'
import epic from './epic'

export default {
  updater,
  epic,
  middlewares: [
//    debug
  ],
  enhancers: []
}

function debug ({ getState }) {
  return next => action => {
    const nextValue = next(action)
    debugger
    return nextValue
  }
}

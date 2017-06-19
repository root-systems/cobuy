import { combineEpics } from 'redux-observable'

import { epic as agents } from 'dogstack-agents'

export default combineEpics(
  agents
)

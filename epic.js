import { combineEpics } from 'redux-observable'

import { epic as agents } from 'dogstack-agents'
import { epic as taskPlans } from './tasks/plans'

export default combineEpics(
  agents,
  taskPlans
)

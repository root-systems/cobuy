import { combineEpics } from 'redux-observable'

import { epic as agents } from 'dogstack-agents'
import ordering from './ordering/epic'
import { epic as taskPlans } from './tasks/dux/plans'
import { epic as taskWorks } from './tasks/dux/works'

export default combineEpics(
  agents,
  ordering,
  taskPlans,
  taskWorks
)

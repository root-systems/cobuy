import { combineEpics } from 'redux-observable'

import { epic as agents } from 'dogstack-agents'
import { epic as taskPlans } from './tasks/dux/plans'
import { epic as taskWorks } from './tasks/dux/works'
import { epic as orders } from './ordering/dux/orders'

export default combineEpics(
  agents,
  orders,
  taskPlans,
  taskWorks
)

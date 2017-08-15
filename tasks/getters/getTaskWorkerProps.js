import { createStructuredSelector } from 'reselect'

import getCurrentTaskPlan from './getCurrentTaskPlan'

export default createStructuredSelector({
  taskPlan: getCurrentTaskPlan
})

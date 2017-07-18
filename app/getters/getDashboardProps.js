import { createStructuredSelector } from 'reselect'

import getTaskPlans from '../../tasks/getters/getTaskPlans'

export const getDashboardProps = createStructuredSelector({
  taskPlans: getTaskPlans
})

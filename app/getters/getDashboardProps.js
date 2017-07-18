import { createStructuredSelector } from 'reselect'

import getTaskPlans from '../../tasks/getters/getTaskPlans'

const getDashboardProps = createStructuredSelector({
  taskPlans: getTaskPlans
})

export default getDashboardProps

import { createStructuredSelector } from 'reselect'

import getParentTaskPlans from '../../tasks/getters/getParentTaskPlans'

const getDashboardProps = createStructuredSelector({
  taskPlans: getParentTaskPlans
})

export default getDashboardProps

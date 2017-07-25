import { connect } from 'feathers-action-react'

import Dashboard from '../components/Dashboard'
import { actions as taskPlanActions } from '../../tasks/dux/plans'
import { actions as taskWorkActions } from '../../tasks/dux/works'
import { actions as orderActions } from '../../ordering/dux/orders'
import getDashboardProps from '../getters/getDashboardProps'

export default connect({
  selector: getDashboardProps,
  actions: {
    taskPlans: taskPlanActions,
    taskWorks: taskWorkActions,
    orders: orderActions
  },
  query: [
    {
      service: 'taskPlans',
      params: {}
    },
    {
      service: 'taskWorks',
      params: {}
    }
  ]
})(Dashboard)

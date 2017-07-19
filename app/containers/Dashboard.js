import { connect } from 'feathers-action-react'

import Dashboard from '../components/Dashboard'
import { actions as taskPlanActions } from '../../tasks/dux/plans'
import { actions as taskWorkActions } from '../../tasks/dux/works'
import * as orderingActions from '../../ordering/actions'
import getDashboardProps from '../getters/getDashboardProps'

export default connect({
  selector: getDashboardProps,
  actions: {
    taskPlans: taskPlanActions,
    taskWorks: taskWorkActions,
    ordering: orderingActions
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

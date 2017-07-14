import { connect } from 'feathers-action-react'

import Dashboard from '../components/Dashboard'

import { actions as taskPlanActions } from '../../tasks/dux/plans'

import { getDashboardProps } from '../getters'

export default connect({
  selector: getDashboardProps,
  actions: { taskPlans: taskPlanActions },
  query: {
    service: 'taskPlans',
    params: {}
  }
})(Dashboard)

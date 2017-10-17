import { connect } from 'feathers-action-react'
import { isEmpty } from 'ramda'

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
  query: (props) => {
    var queries = []
    const { currentAgent } = props.selected
    if (currentAgent) {
      queries.push({
        service: 'taskPlans',
        params: {
          query: {
            assigneeId: currentAgent.id
          }
        }
      })
      queries.push({
        service: 'taskWorks',
        params: {
          query: {
            workerAgentId: currentAgent.id
          }
        }
      })
    }
    return queries
  },
  shouldQueryAgain: (props, status) => {
    const { currentAgent, taskPlans } = props.selected
    if (status.isPending) return false
    if (currentAgent && isEmpty(taskPlans)) return true
    return false
  }
})(Dashboard)

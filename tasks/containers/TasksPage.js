import { connect } from 'feathers-action-react'
import { isNil, isEmpty, prop, groupBy, pipe, either, values } from 'ramda'

import TasksPage from '../components/TasksPage'
import { actions as taskPlanActions } from '../../tasks/dux/plans'
import { actions as taskWorkActions } from '../../tasks/dux/works'
import getTaskPageProps from '../getters/getTaskPageProps'

export default connect({
  selector: getTaskPageProps,
  actions: {
    taskPlans: taskPlanActions,
    taskWorks: taskWorkActions
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
    if (status.isPending) return false
    const { currentAgent, taskPlans } = props.selected
    if (currentAgent && hasNotQueriedForTaskPlans(status)) return true
    return false
  }
})(TasksPage)

const hasNotQueriedForTaskPlans = pipe(
  prop('requests'),
  values,
  groupBy(prop('service')),
  either(
    pipe(prop('taskPlans'), either(isNil, isEmpty)),
    pipe(prop('taskWorks'), either(isNil, isEmpty))
  )
)

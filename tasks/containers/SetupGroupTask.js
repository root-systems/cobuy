import { isNil, path } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { agents, profiles } from 'dogstack-agents/actions'
import getSetupGroupTaskProps from '../getters/getSetupGroupTaskProps'
import SetupGroupTask from '../components/SetupGroupTask'

const getContextAgentFromTaskPlan = path(['params', 'contextAgent'])

export default compose(
  connectFeathers({
    selector: getSetupGroupTaskProps,
    actions: {
      agents,
      profiles
    },
    // TODO can optimize `feathers-action-react` to de-dupe
    // new queries by checking if deepEqual
    query: (props) => {
      var queries = []
      //  once we have the task plan, query for the context agent
      const { taskPlan } = props

      if (taskPlan) {
        queries.push({
          service: 'agents',
          id: taskPlan.params.contextAgentId
        })
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: taskPlan.params.contextAgentId
            }
          }
        })
      }

      return queries
    },
    shouldQueryAgain: (props, status) => {
      if (status.isPending) return false

      const { taskPlan } = props.selected

      // wait for task plan before re-query
      if (isNil(taskPlan)) return false

      // re-query when we haven't gotten back contextAgent or taskWork
      const contextAgent = getContextAgentFromTaskPlan(taskPlan)

      if (isNil(contextAgent)) return true

      return false
    }
  })
)(SetupGroupTask)

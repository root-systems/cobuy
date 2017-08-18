import { isNil, path, prop, pipe, values, any, forEach, either } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { agents, profiles, relationships, credentials } from 'dogstack-agents/actions'
import getSetupGroupTaskProps from '../getters/getSetupGroupTaskProps'
import SetupSupplierTask from '../components/SetupSupplierTask'

const getContextAgentFromTaskPlan = path(['params', 'contextAgent'])

export default compose(
  connectFeathers({
    selector: getSetupGroupTaskProps,
    actions: {
      agents,
      profiles,
      relationships,
      credentials
    },
    // TODO can optimize `feathers-action-react` to de-dupe
    // new queries by checking if deepEqual
    query: (props) => {
      var queries = []
      //  once we have the task plan, query for the context agent
      const { taskPlan } = props

      if (taskPlan) {
        const { params: { contextAgentId, contextAgent } } = taskPlan
        queries.push({
          service: 'agents',
          id: contextAgentId
        })
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: contextAgentId
            }
          }
        })
        queries.push({
          service: 'relationships',
          params: {
            query: {
              sourceId: contextAgentId
            }
          }
        })

        if (contextAgent) {
          const { members } = contextAgent
          const queryEachMember = forEach(member => {
            const { agentId } = member
            queries.push({
              service: 'agents',
              id: agentId
            })
            queries.push({
              service: 'profiles',
              params: {
                query: {
                  agentId
                }
              }
            })
            queries.push({
              service: 'credentials',
              params: {
                query: {
                  agentId
                }
              }
            })
          })
          queryEachMember(members)
        }
      }

      return queries
    },
    shouldQueryAgain: (props, status) => {
      if (status.isPending) return false

      const { taskPlan } = props.ownProps

      // wait for task plan before re-query
      if (isNil(taskPlan)) return false

      // re-query when we haven't gotten back contextAgent or taskWork
      const contextAgent = getContextAgentFromTaskPlan(taskPlan)

      if (isNil(contextAgent)) return true
      if (anyMembersAreNil(contextAgent)) {
        return true
      }

      return false
    }
  })
)(SetupSupplierTask)

const anyMembersAreNil = pipe(
  prop('members'),
  either(
    any(pipe(path(['agent', 'profile', 'id']), isNil)),
    any(pipe(path(['agent', 'credential', 'id']), isNil))
  )
)

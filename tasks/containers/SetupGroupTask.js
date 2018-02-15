import h from 'react-hyperscript'
import { isNil, path, prop, pipe, values, any, forEach, either, map, filter, indexBy, isEmpty } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { agents, profiles, relationships, credentials } from 'dogstack-agents/actions'
import getSetupGroupTaskProps from '../getters/getSetupGroupTaskProps'
import SetupGroupTask from '../components/SetupGroupTask'

const getConsumerAgentFromTaskPlan = path(['params', 'consumerAgent'])

export default compose(
  connectFeathers({
    selector: getSetupGroupTaskProps,
    actions: {
      agents,
      profiles,
      relationships,
      credentials
    },
    // TODO far3
    query: []
    /*
    // TODO can optimize `feathers-action-react` to de-dupe
    // new queries by checking if deepEqual
    query: (props) => {
      var queries = []
      //  once we have the task plan, query for the consumer agent
      const { taskPlan } = props

      if (taskPlan) {
        const { params: { consumerAgentId, consumerAgent } } = taskPlan
        queries.push({
          service: 'agents',
          id: consumerAgentId
        })
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: consumerAgentId
            }
          }
        })
        queries.push({
          service: 'relationships',
          params: {
            query: {
              sourceId: consumerAgentId
            }
          }
        })

        if (consumerAgent) {
          const { members } = consumerAgent
          const getMemberAgentIds = map(prop('agentId'))
          const memberAgentIds = getMemberAgentIds(members)
          queries.push({
            service: 'agents',
            params: {
              query: {
                id: {
                  $in: memberAgentIds
                }
              }
            }
          })
          queries.push({
            service: 'profiles',
            params: {
              query: {
                agentId: {
                  $in: memberAgentIds
                }
              }
            }
          })
          queries.push({
            service: 'credentials',
            params: {
              query: {
                agentId: {
                  $in: memberAgentIds
                }
              }
            }
          })
        }
      }

      return queries
    },
    shouldQueryAgain: (props, status) => {
      if (status.isPending) return false

      const { taskPlan } = props.ownProps

      // wait for task plan before re-query
      if (isNil(taskPlan)) return false

      // re-query when we haven't gotten back consumerAgent or taskWork
      const consumerAgent = getConsumerAgentFromTaskPlan(taskPlan)

      if (isNil(consumerAgent)) return true
      if (anyMembersAreNil(consumerAgent)) {
        return true
      }

      return false
    }
    */
  })
// )(SetupGroupTask)
)(props => {
  const { relationships, taskPlan = {} } = props
  const { params: { consumerAgentId } } = taskPlan
  const memberRelationships = getMemberRelationshipsForBuyingGroup(consumerAgentId)(relationships)
  return h(SetupGroupTask, {
    memberRelationships: memberRelationships,
    ...props
  })
})

const getMemberRelationshipsForBuyingGroup = (consumerAgentId) => {
  return (relationships) => {
    if (isNil(consumerAgentId)) return []
    if (isEmpty(relationships)) return []
    const isRelated = n => n.sourceId === consumerAgentId && n.relationshipType === 'member'
    const memberRelationships = values(filter(isRelated, relationships))
    const groupByTargetId = indexBy(prop('targetId'))
    return groupByTargetId(memberRelationships)
  }
}

const anyMembersAreNil = pipe(
  prop('members'),
  either(
    any(pipe(path(['agent', 'profile', 'id']), isNil)),
    any(pipe(path(['agent', 'credential', 'id']), isNil))
  )
)

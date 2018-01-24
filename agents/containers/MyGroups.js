import h from 'react-hyperscript'
import { isNil, path, prop, pipe, values, any, forEach, either, not, equals } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { agents, profiles, relationships, credentials } from 'dogstack-agents/actions'
import getMyGroupsProps from '../getters/getMyGroupsProps'
import MyGroups from '../components/MyGroups'

export default compose(
  connectFeathers({
    selector: getMyGroupsProps,
    actions: {
      agents,
      profiles,
      relationships,
      credentials
    },
    query: (props) => {
      var queries = []
      const { currentAgent, currentAgentGroupIds } = props.selected

      if (currentAgent) {
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: currentAgent.id
            }
          }
        })
        queries.push({
          service: 'relationships',
          params: {
            query: {
              targetId: currentAgent.id
            }
          }
        })
      }

      if (currentAgentGroupIds) {
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: {
                $in: currentAgentGroupIds
              }
            }
          }
        })
      }

      return queries
    },
    shouldQueryAgain: (props, status, prevProps) => {
      if (status.isPending) return false

      const { currentAgent: prevCurrentAgent, currentAgentGroupIds: prevCurrentAgentGroupIds } = prevProps.selected
      const { currentAgent, currentAgentGroupIds } = props.selected

      if (isNil(prevCurrentAgent) && not(isNil(currentAgent))) return true
      if (not(equals(prevCurrentAgentGroupIds, currentAgentGroupIds))) return true

      return false
    }
  })
)(props => {
  const { currentAgent, actions, currentAgentGroupProfiles } = props

  if (isNil(currentAgent)) {
    return null
  }

  return h(MyGroups, {
    initialValues: currentAgent.profile,
    updateProfile: (nextProfile) => {
      actions.profiles.update(currentAgent.profile.id, nextProfile)
    },
    agentType: 'my',
    isEditing: true,
    agent: currentAgent,
    currentAgentGroupProfiles: currentAgentGroupProfiles
  })
})

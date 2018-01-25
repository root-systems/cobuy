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
      const { currentAgent, currentAgentGroupIds, currentAgentGroupSupplierIds } = props.selected
      // get currentAgent profile and relationships where currentAgent is a member/admin
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
      // now get profiles for buying groups AND get the supplier group ids
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
        queries.push({
          service: 'relationships',
          params: {
            query: {
              sourceId: {
                $in: currentAgentGroupIds
              }
            }
          }
        })
      }

      if (currentAgentGroupSupplierIds) {
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: {
                $in: currentAgentGroupSupplierIds
              }
            }
          }
        })
      }

      return queries
    },
    shouldQueryAgain: (props, status, prevProps) => {
      if (status.isPending) return false

      const {
        currentAgent: prevCurrentAgent,
        currentAgentGroupIds: prevCurrentAgentGroupIds,
        currentAgentGroupSupplierIds: prevCurrentAgentGroupSupplierIds
      } = prevProps.selected
      const {
        currentAgent,
        currentAgentGroupIds,
        currentAgentGroupSupplierIds
      } = props.selected

      if (isNil(prevCurrentAgent) && not(isNil(currentAgent))) return true
      if (not(equals(prevCurrentAgentGroupIds, currentAgentGroupIds))) return true
      if (not(equals(prevCurrentAgentGroupSupplierIds, currentAgentGroupSupplierIds))) return true

      return false
    }
  })
)(props => {
  const { currentAgent, currentAgentGroupProfiles, currentAgentGroupSupplierProfiles, currentAgentGroupSupplierIds } = props

  if (isNil(currentAgent)) {
    return null
  }

  return h(MyGroups, {
    currentAgent: currentAgent,
    currentAgentGroupProfiles: currentAgentGroupProfiles
  })
})

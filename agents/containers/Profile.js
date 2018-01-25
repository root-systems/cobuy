import h from 'react-hyperscript'
import { isNil, path, prop, pipe, values, any, forEach, either, not, equals } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'
import { push } from 'react-router-redux'

import { agents, profiles, relationships, credentials } from 'dogstack-agents/actions'
import getProfileProps from '../getters/getProfileProps'
import Profile from '../components/Profile'

export default compose(
  connectFeathers({
    selector: getProfileProps,
    actions: {
      agents,
      profiles,
      relationships,
      credentials
    },
    router: {
      push: (cid, ...args) => push(...args)
    },
    query: (props) => {
      var queries = []
      const { currentProfile } = props.selected

      const { profileId } = props.match.params

      queries.push({
        service: 'profiles',
        id: profileId
      })

      if (currentProfile) {
        queries.push({
          service: 'agents',
          params: {
            query: {
              id: currentProfile.agentId
            }
          }
        })
      }


      // if (currentAgent) {
      //   queries.push({
      //     service: 'profiles',
      //     params: {
      //       query: {
      //         agentId: currentAgent.id
      //       }
      //     }
      //   })
      //   queries.push({
      //     service: 'relationships',
      //     params: {
      //       query: {
      //         targetId: currentAgent.id
      //       }
      //     }
      //   })
      // }
      //
      // if (currentAgentGroupIds) {
      //   queries.push({
      //     service: 'profiles',
      //     params: {
      //       query: {
      //         agentId: {
      //           $in: currentAgentGroupIds
      //         }
      //       }
      //     }
      //   })
      // }

      return queries
    },
    shouldQueryAgain: (props, status, prevProps) => {
      if (status.isPending) return false

      const { currentProfile: prevCurrentProfile } = prevProps.selected
      const { currentProfile } = props.selected

      if (isNil(prevCurrentProfile) && not(isNil(currentProfile))) return true
      //
      // const { currentAgent: prevCurrentAgent, currentAgentGroupIds: prevCurrentAgentGroupIds } = prevProps.selected
      // const { currentAgent, currentAgentGroupIds } = props.selected
      //
      // if (isNil(prevCurrentAgent) && not(isNil(currentAgent))) return true
      // if (not(equals(prevCurrentAgentGroupIds, currentAgentGroupIds))) return true

      return false
    }
  })
)(props => {
  const { currentProfile, relatedAgent } = props

  if (isNil(currentProfile)) {
    return null
  }

  return h(Profile, {
    initialValues: currentProfile,
    updateProfile: (nextProfile) => {
      actions.profiles.update(currentAgent.profile.id, nextProfile)
    },
    agentType: 'supplier',
    isEditing: true,
    agent: relatedAgent,
  })
})

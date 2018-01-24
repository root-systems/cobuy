import h from 'react-hyperscript'
import { isNil, path, prop, pipe, values, any, forEach, either } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { agents, profiles, relationships, credentials } from 'dogstack-agents/actions'
import getMyProfileProps from '../getters/getMyProfileProps'
import MyProfile from '../components/MyProfile'
import Profile from '../components/Profile'

export default compose(
  connectFeathers({
    selector: getMyProfileProps,
    actions: {
      agents,
      profiles,
      relationships,
      credentials
    },
    query: (props) => {
      var queries = []
      const { currentAgent } = props

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
              sourceId: currentAgent.id
            }
          }
        })
      }

      return queries
    },
    shouldQueryAgain: (props, status) => {
      if (status.isPending) return false

      return false
    }
  })
)(props => {
  const { currentAgent, actions } = props

  if (isNil(currentAgent)) {
    return null
  }

  return h(Profile, {
    initialValues: currentAgent.profile,
    updateProfile: (nextProfile) => {
      actions.profiles.update(currentAgent.profile.id, nextProfile)
    },
    agentType: 'my',
    isEditing: true,
    agent: currentAgent
  })
})

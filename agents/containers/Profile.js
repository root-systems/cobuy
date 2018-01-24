import { isNil, path, prop, pipe, values, any, forEach, either } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

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
    query: (props) => {
      var queries = []
      const { agent } = props

      if (agent) {
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: agent.id
            }
          }
        })
        queries.push({
          service: 'relationships',
          params: {
            query: {
              sourceId: agent.id
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
)(Profile)

import h from 'react-hyperscript'
import { isNil, path, prop, pipe, values, any, forEach, either, not, equals, isEmpty, map } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'
import { push } from 'react-router-redux'

import { agents, profiles, relationships, credentials } from 'dogstack-agents/actions'
import { products, resourceTypes } from '../../actions'
import getProfileProps from '../getters/getProfileProps'
import Profile from '../components/Profile'

const getProductIds = map(prop('id'))
const getResourceTypeIds = map(prop('resourceTypeId'))

export default compose(
  connectFeathers({
    selector: getProfileProps,
    actions: {
      agents,
      profiles,
      relationships,
      credentials,
      products,
      resourceTypes
    },
    router: {
      push: (cid, ...args) => push(...args)
    },
    query: (props) => {
      var queries = []
      const { currentProfile, relatedAgent, agentType, products } = props.selected

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

      if (relatedAgent) {
        queries.push({
          service: 'relationships',
          params: {
            query: {
              targetId: relatedAgent.id
            }
          }
        })
        queries.push({
          service: 'relationships',
          params: {
            query: {
              sourceId: relatedAgent.id
            }
          }
        })
      }

      if (agentType === 'supplier') {
        queries.push({
          service: 'products',
          params: {
            query: {
              supplierAgentId: relatedAgent.id
            }
          }
        })
      }

      if (agentType === 'supplier' && !isEmpty(products)) {
        queries.push({
          service: 'resourceTypes',
          params: {
            query: {
              id: {
                $in: getResourceTypeIds(products)
              }
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

      const {
        currentProfile: prevCurrentProfile,
        relatedAgent: prevRelatedAgent,
        agentType: prevAgentType,
        products: prevProducts
      } = prevProps.selected

      const {
        currentProfile,
        relatedAgent,
        agentType,
        products
      } = props.selected

      const prevProductIds = getProductIds(prevProducts)
      const productIds = getProductIds(products)

      if (isNil(prevCurrentProfile) && not(isNil(currentProfile))) return true
      if (isNil(prevRelatedAgent) && not(isNil(relatedAgent))) return true
      if (isNil(prevAgentType) && not(isNil(agentType))) return true
      if (!equals(prevProductIds, productIds)) return true

      return false
    }
  })
)(props => {
  const { currentProfile, relatedAgent, agentType, products, resourceTypes } = props

  if (isNil(currentProfile)) {
    return null
  }

  return h(Profile, {
    initialValues: currentProfile,
    updateProfile: (nextProfile) => {
      profiles.update(relatedAgent.profile.id, nextProfile)
    },
    isEditing: true,
    agent: relatedAgent,
    agentType: agentType,
    resourceTypes: resourceTypes
  })
})

import h from 'react-hyperscript'
import { isNil, path, prop, pipe, values, any, forEach, either, not, equals, isEmpty, map, indexBy, filter } from 'ramda'
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
    // TODO far3
    query: [],
    /*
    query: (props) => {
      var queries = []
      const { currentProfile, relatedAgent, agentType, products, memberAgentIds, buyingGroupIds } = props.selected

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
        queries.push({
          service: 'relationships',
          params: {
            query: {
              targetId: currentProfile.agentId
            }
          }
        })
        queries.push({
          service: 'relationships',
          params: {
            query: {
              sourceId: currentProfile.agentId
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

      if (agentType === 'group' && !isEmpty(memberAgentIds)) {
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

      if (agentType === 'my' && !isEmpty(buyingGroupIds)) {
        queries.push({
          service: 'agents',
          id: {
            $in: buyingGroupIds
          }
        })
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: {
                $in: buyingGroupIds
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
        currentProfile: prevCurrentProfile,
        relatedAgent: prevRelatedAgent,
        agentType: prevAgentType,
        products: prevProducts,
        memberAgentIds: prevMemberAgentIds,
        buyingGroupIds: prevBuyingGroupIds
      } = prevProps.selected

      const {
        currentProfile,
        relatedAgent,
        agentType,
        products,
        memberAgentIds,
        buyingGroupIds
      } = props.selected

      const prevProductIds = getProductIds(prevProducts)
      const productIds = getProductIds(products)

      if (isNil(prevCurrentProfile) && not(isNil(currentProfile))) return true
      if (isNil(prevRelatedAgent) && not(isNil(relatedAgent))) return true
      if (isNil(prevAgentType) && not(isNil(agentType))) return true
      if (!equals(prevProductIds, productIds)) return true
      if (!equals(prevMemberAgentIds, memberAgentIds)) return true
      if (!equals(prevBuyingGroupIds, buyingGroupIds)) return true

      return false
    }
    */
  })
)(props => {
  const { currentProfile, relatedAgent = {}, agentType, resourceTypes, actions, buyingGroupProfiles, memberRelationships } = props
  const { members = [] } = relatedAgent

  if (isNil(currentProfile)) {
    return null
  }

  return h(Profile, {
    initialValues: currentProfile,
    updateProfile: (nextProfile) => {
      actions.profiles.update(relatedAgent.profile.id, nextProfile)
    },
    removeMember: (memberVal) => {
      const memberRelationship = memberRelationships[memberVal.agentId]
      actions.relationships.remove(memberRelationship.id)
    },
    createMembers: (membersData) => {
      const groupMembersById = indexBy(prop('agentId'))
      const initialMemberValuesById = groupMembersById(members)
      const filterDirtyByInitialValuesComparison = memberData => !equals(memberData, initialMemberValuesById[memberData.agentId])
      const dirtyMembers = filter(filterDirtyByInitialValuesComparison, membersData.members)
      return dirtyMembers.map((member) => {
        if (isEmpty(member)) return null

        const { agent, roles } = member
        const {
          id,
          type = 'person',
          profile = {},
          credential = {}
        } = agent
        const rolesToRelationships = (roles = {}) => {
          var relationships = [
            { relationshipType: 'member' }
          ]
          if (roles.admin) {
            relationships.push({
              relationshipType: 'admin'
            })
          }
          return relationships
        }
        const relationships = rolesToRelationships(roles)
        const contextAgentId = relatedAgent.id

        const agentData = {
          id,
          type,
          profile,
          credential,
          relationships,
          contextAgentId
        }

        if (isNil(agentData.id)) {
          actions.agents.create(agentData)
        } else {
          actions.agents.patch(id, agentData)
        }
      })
    },
    isEditing: true,
    agent: relatedAgent,
    agentType: agentType,
    resourceTypes: resourceTypes,
    currentAgentGroupProfiles: buyingGroupProfiles
  })
})

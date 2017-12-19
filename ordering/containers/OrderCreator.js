import h from 'react-hyperscript'
import { isNil, equals, uniq, pipe, prop, values, groupBy, either, isEmpty, merge, none, reduce, map, flatten } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { actions as orders } from '../dux/orders'
import { agents, relationships, profiles } from 'dogstack-agents/actions'

import getOrderCreatorProps from '../getters/getOrderCreatorProps'
import OrderCreator from '../components/OrderCreator'

import currentAgentMissingAnyGroupProfiles from '../../tasks/util/currentAgentMissingAnyGroupProfiles'

/*
queries:
- get all groups the currentUser is either an admin or member of
- get all suppliers for all of those groups
- get all members for all of those groups (to potentially be the admin for the order)
- then for steps 2 & 3, filter the data based on the group selected in step 1
*/

export default compose(
  connectFeathers({
    selector: getOrderCreatorProps,
    actions: {
      orders,
      agents,
      relationships,
      profiles
    },
    query: (props) => {
      var queries = []
      const { selected } = props
      const { currentAgent, currentAgentGroupIds } = selected

      // get groups and profiles currentAgent is part of
      if (currentAgent) {
        queries.push({
          service: 'relationships',
          params: {
            query: {
              targetId: currentAgent.id,
              relationshipType: {
                $in: ['member', 'admin']
              }
            }
          }
        })

        if (!isEmpty(currentAgentGroupIds)) {
          // get members / suppliers with a relationship to any groups of the currentAgent
          queries.push({
            service: 'relationships',
            params: {
              query: {
                sourceId: {
                  $in: currentAgentGroupIds
                },
                relationshipType: {
                  $in: ['member', 'supplier']
                }
              }
            }
          })
        }

        const agentIds = getAgentIds(props.selected)
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: {
                $in: agentIds
              }
            }
          }
        })
      }

      return queries
    },
    shouldQueryAgain: (props, status, prevProps) => {
      if (status.isPending) return false

      const { currentAgent } = props.selected
      if (isNil(currentAgent)) return false

      if (hasNotQueriedForRelated(status)) return true

      const agentIds = getAgentIds(props.selected)
      const prevAgentIds = getAgentIds(prevProps.selected)
      if (!equals(agentIds, prevAgentIds)) return true

      return false
    }
  })
)(OrderCreatorContainer)

function getAgentIds (selected) {
  const {
    currentAgentGroupIds,
    currentAgentGroupSupplierIds,
    currentAgentGroupMemberIds
  } = selected
  const agentIds = uniq([
    ...currentAgentGroupIds,
    ...currentAgentGroupMemberIds,
    ...currentAgentGroupSupplierIds
  ])
  return agentIds
}

function OrderCreatorContainer (props) {
  const { actions } = props

  function handleSubmit (values) {
    if (values.consumerAgentId === 'NEW_CONSUMER') values.consumerAgentId = null
    if (values.supplierAgentId === 'NEW_SUPPLIER') values.supplierAgentId = null
    actions.orders.create(values)
  }

  const nextProps = merge(props, {
    onSubmit: handleSubmit
  })

  return h(OrderCreator, nextProps)
}

const variadicEither = (head, ...tail) => reduce(either, head, tail)

const hasQueriedForSupplierAgentId = (relationships) => {
  if (isNil(relationships)) return
  const queriedRelationshipTypes = flatten(map((relationship) => {
    return relationship.args.params.query.relationshipType.$in
  }, relationships))
  return none(x => x === 'supplier', queriedRelationshipTypes)
}

const hasNotQueriedForRelated = pipe(
  prop('requests'),
  values,
  groupBy(prop('service')),
  variadicEither(
    pipe(prop('relationships'), either(isNil, isEmpty)),
    pipe(prop('relationships'), hasQueriedForSupplierAgentId),
    pipe(prop('profiles'), either(isNil, isEmpty))
  )
)

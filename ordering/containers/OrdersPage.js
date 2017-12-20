import { connect } from 'feathers-action-react'
import { isNil, forEach, isEmpty, prop, groupBy, pipe, either, values, map, unnest, uniq, props, equals } from 'ramda'

import OrdersPage from '../components/OrdersPage'
import { actions as taskPlanActions } from '../../tasks/dux/plans'
import { actions as taskWorkActions } from '../../tasks/dux/works'
import { actions as orderActions } from '../../ordering/dux/orders'
import { agents as agentActions, profiles as profileActions, relationships as relationshipActions } from 'dogstack-agents/actions'
import getOrdersPageProps from '../getters/getOrdersPageProps'

const getConsumerAgentIdsFromOrders = pipe(
  values,
  map(prop('consumerAgentId')),
  uniq
)
const getAgentIdsFromOrders = pipe(
  values,
  map(props(['consumerAgentId', 'supplierAgentId', 'adminAgentId'])),
  unnest,
  uniq
)
const getIds = pipe(values, map(prop('id')))

export default connect({
  selector: getOrdersPageProps,
  actions: {
    orders: orderActions,
    taskPlans: taskPlanActions,
    taskWorks: taskWorkActions,
    agents: agentActions,
    profiles: profileActions,
    relationships: relationshipActions
  },
  query: (props) => {
    var queries = []
    const { allOrders: orders } = props.selected

    queries.push({
      service: 'orders'
    })

    if (!isEmpty(orders)) {
      const agentIds = getAgentIdsFromOrders(orders)

      queries.push({
        service: 'agents',
        params: {
          query: {
            id: {
              $in: agentIds
            }
          }
        }
      })
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

      const consumerAgentIds = getConsumerAgentIdsFromOrders(orders)
      queries.push({
        service: 'relationships',
        params: {
          query: {
            sourceId: {
              $in: consumerAgentIds
            },
            relationshipType: {
              $in: ['member', 'admin', 'supplier']
            }
          }
        }
      })

      const orderIds = getIds(orders)

      queries.push({
        service: 'taskPlans',
        params: {
          query: {
            orderId: {
              $in: orderIds
            }
          }
        }
      })

      // TODO search for only relevant task works
      queries.push({
        service: 'taskWorks',
        params: {
          query: {
          }
        }
      })
    }
    return queries
  },
  shouldQueryAgain: (props, status, prevProps) => {
    if (status.isPending) return false
    const { allOrders: orders } = props.selected
    if (!isEmpty(orders) && hasNotQueriedForRelated(status)) return true
    const agentIds = getAgentIdsFromOrders(orders)
    const { orders: prevOrders } = prevProps.selected
    const prevAgentIds = getAgentIdsFromOrders(prevOrders)
    if (!equals(agentIds, prevAgentIds)) return true
    return false
  }
})(OrdersPage)

const hasNotQueriedForRelated = pipe(
  prop('requests'),
  values,
  groupBy(prop('service')),
  either(
    pipe(prop('taskPlans'), either(isNil, isEmpty)),
    pipe(prop('taskWorks'), either(isNil, isEmpty)),
    pipe(prop('agents'), either(isNil, isEmpty)),
    pipe(prop('profiles'), either(isNil, isEmpty))
  )
)

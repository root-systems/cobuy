import { connect } from 'feathers-action-react'
import { isNil, forEach, isEmpty, prop, groupBy, pipe, either, values, props, equals } from 'ramda'

import OrderPage from '../components/OrderPage'
import { actions as taskPlanActions } from '../../tasks/dux/plans'
import { actions as taskWorkActions } from '../../tasks/dux/works'
import { actions as orderActions } from '../../ordering/dux/orders'
import { agents as agentActions, profiles as profileActions } from 'dogstack-agents/actions'
import getOrderPageProps from '../getters/getOrderPageProps'

const getAgentIdsFromOrder = props(['consumerAgentId', 'supplierAgentId', 'adminAgentId'])

export default connect({
  selector: getOrderPageProps,
  actions: {
    orders: orderActions,
    taskPlans: taskPlanActions,
    taskWorks: taskWorkActions,
    agents: agentActions,
    profiles: profileActions
  },
  query: (props) => {
    var queries = []
    const { orderId } = props.match.params

    queries.push({
      service: 'orders',
      id: orderId
    })

    queries.push({
      service: 'taskPlans',
      params: {
        query: {
          params: {
            orderId
          }
        }
      }
    })

    queries.push({
      service: 'taskWorks',
      params: {
        query: {
          params: {
            orderId
          }
        }
      }
    })

    const { order } = props.selected
    if (order) {
      const agentIds = getAgentIdsFromOrder(order)

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
    }

    return queries
  },
  shouldQueryAgain: (props, status, prevProps) => {
    if (status.isPending) return false
    const { order } = props.selected
    if (order && hasNotQueriedForRelated(status)) return true
    const agentIds = getAgentIdsFromOrder(order)
    const { order: prevOrder } = prevProps.selected
    const prevAgentIds = getAgentIdsFromOrder(prevOrder)
    if (!equals(agentIds, prevAgentIds)) return true
    return false
  }
})(OrderPage)

const hasNotQueriedForRelated = pipe(
  prop('requests'),
  values,
  groupBy(prop('service')),
  either(
    pipe(prop('agents'), either(isNil, isEmpty)),
    pipe(prop('profiles'), either(isNil, isEmpty))
  )
)

import { connect } from 'feathers-action-react'
import { isNil, forEach, isEmpty, prop, groupBy, pipe, either, values } from 'ramda'

import OrderPage from '../components/OrderPage'
import { actions as taskPlanActions } from '../../tasks/dux/plans'
import { actions as taskWorkActions } from '../../tasks/dux/works'
import { actions as orderActions } from '../../ordering/dux/orders'
import getOrderPageProps from '../getters/getOrderPageProps'

export default connect({
  selector: getOrderPageProps,
  actions: {
    orders: orderActions,
    taskPlans: taskPlanActions,
    taskWorks: taskWorkActions
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

    return queries
  },
  shouldQueryAgain: (props, status) => {
    if (status.isPending) return false
    const { order } = props.selected
    return false
  }
})(OrderPage)

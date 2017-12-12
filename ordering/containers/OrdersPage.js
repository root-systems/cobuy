import { connect } from 'feathers-action-react'
import { isNil, forEach, isEmpty, prop, groupBy, pipe, either, values } from 'ramda'

import OrdersPage from '../components/OrdersPage'
import { actions as taskPlanActions } from '../../tasks/dux/plans'
import { actions as taskWorkActions } from '../../tasks/dux/works'
import { actions as orderActions } from '../../ordering/dux/orders'
import getOrdersPageProps from '../getters/getOrdersPageProps'

export default connect({
  selector: getOrdersPageProps,
  actions: {
    orders: orderActions,
    taskPlans: taskPlanActions,
    taskWorks: taskWorkActions
  },
  query: (props) => {
    var queries = []
    const { orders } = props.selected

    queries.push({
      service: 'orders'
    })

    if (orders) {
      const queryEachOrder = pipe(
        values,
        forEach(order => {
          queries.push({
            service: 'taskPlans',
            params: {
              query: {
                params: {
                  order
                }
              }
            }
          })
          queries.push({
            service: 'taskWorks',
            params: {
              query: {
                params: {
                  order
                }
              }
            }
          })
        })
      )
      queryEachOrder(orders)
    }
    return queries
  },
  shouldQueryAgain: (props, status) => {
    if (status.isPending) return false
    const { orders } = props.selected
    if (orders && hasNotQueriedForTasks(status)) return true
    return false
  }
})(OrdersPage)

const hasNotQueriedForTasks = pipe(
  prop('requests'),
  values,
  groupBy(prop('service')),
  either(
    pipe(prop('taskPlans'), either(isNil, isEmpty)),
    pipe(prop('taskWorks'), either(isNil, isEmpty))
  )
)

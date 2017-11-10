import { isNil, path, isEmpty } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import getViewOrderSummaryTaskProps from '../getters/getViewOrderSummaryTaskProps'
import ViewOrderSummaryTask from '../components/ViewOrderSummaryTask'

import { orders, orderPlans } from '../../actions'

export default compose(

  connectFeathers({
    selector: getViewOrderSummaryTaskProps,
    actions: {
      orders,
      orderPlans
    },
    query: (props) => {
      var queries = []
      const { taskPlan, selected } = props

      if (taskPlan) {
        const { params: { orderId } } = taskPlan
        queries.push({
          service: 'orderPlans',
          params: {
            query: {
              orderId
            }
          }
        })
      }

      return queries
    },
    shouldQueryAgain: (props, status) => {
      if (status.isPending) return false

      const { taskPlan } = props.ownProps
      const { currentOrderOrderPlansByAgent } = props.selected

      // wait for task plan before re-query
      if (isNil(taskPlan)) return false

      if (isNil(currentOrderOrderPlansByAgent)) return true

      return false
    }
  })
)(ViewOrderSummaryTask)

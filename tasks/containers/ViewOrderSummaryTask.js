import { isNil, isEmpty, values, flatten, uniq } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import getViewOrderSummaryTaskProps from '../getters/getViewOrderSummaryTaskProps'
import ViewOrderSummaryTask from '../components/ViewOrderSummaryTask'

import { orders, orderPlans, priceSpecs } from '../../actions'

import anyOrderPlansMissingPriceSpecs from '../util/anyOrderPlansMissingPriceSpecs'

export default compose(

  connectFeathers({
    selector: getViewOrderSummaryTaskProps,
    actions: {
      orders,
      orderPlans,
      priceSpecs
    },
    query: (props) => {
      var queries = []
      const { taskPlan, selected } = props
      const { currentOrderOrderPlansByAgent } = selected

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

      if (!isEmpty(currentOrderOrderPlansByAgent)) {
        const priceSpecIds = uniq(flatten(values(currentOrderOrderPlansByAgent).map((product) => {
          return product.map((orderIntent) => {
            return orderIntent.priceSpecId
          })
        })))

        queries.push({
          service: 'priceSpecs',
          params: {
            query: {
              id: {
                $in: priceSpecIds
              }
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

      if (isEmpty(currentOrderOrderPlansByAgent)) return true
      if (anyOrderPlansMissingPriceSpecs(currentOrderOrderPlansByAgent)) return true

      return false
    }
  })
)(ViewOrderSummaryTask)

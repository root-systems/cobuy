import { isNil, isEmpty, prop, pipe, values, map, tap, keys } from 'ramda'
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
        const getPriceSpecIds = pipe(
          // map(prop('priceSpecId')),
          map(map(prop('priceSpecId'))),
          // Why does this always have keys of the productIDs?!
          // {6: Array(1), 8: Array(1)}
          tap(console.log)
          // tap(console.log),
        )
        console.log(currentOrderOrderPlansByAgent)
        queries.push({
          service: 'priceSpecs',
          params: {
            query: {
              id: {
                $in: getPriceSpecIds(currentOrderOrderPlansByAgent)
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

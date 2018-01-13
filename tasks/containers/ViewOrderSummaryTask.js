import { isNil, isEmpty, values, flatten, uniq, pipe, prop, map, keys, any, path } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import getViewOrderSummaryTaskProps from '../getters/getViewOrderSummaryTaskProps'
import ViewOrderSummaryTask from '../components/ViewOrderSummaryTask'

import { orders, orderPlans, priceSpecs, products, resourceTypes } from '../../actions'
import { agents, profiles } from 'dogstack-agents/actions'

import anyOrderPlansMissingPriceSpecs from '../util/anyOrderPlansMissingPriceSpecs'
import anyOrderPlansMissingAgents from '../util/anyOrderPlansMissingAgents'
import anyOrderPlansMissingProducts from '../util/anyOrderPlansMissingProducts'
import anyOrderPlansMissingAgentProfiles from '../util/anyOrderPlansMissingAgentProfiles'
import anyOrderPlansMissingProductResourceTypes from '../util/anyOrderPlansMissingProductResourceTypes'

export default compose(

  connectFeathers({
    selector: getViewOrderSummaryTaskProps,
    actions: {
      orders,
      orderPlans,
      priceSpecs,
      products,
      resourceTypes,
      agents,
      profiles
    },
    query: (props) => {
      var queries = []
      const { taskPlan, selected } = props
      const { currentOrderOrderPlansByAgent } = selected

      const getPriceSpecIds = pipe(
        values,
        flatten,
        map(prop('priceSpecId')),
        uniq
      )
      const getAgentIds = pipe(
        keys,
        map(parseInt)
      )
      const getProductIds = pipe(
        values,
        flatten,
        map(prop('productId')),
        uniq
      )
      const getResourceTypeIds = pipe(
        values,
        flatten,
        map(path(['product', 'resourceTypeId'])),
        uniq
      )

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
        queries.push({
          service: 'orders',
          params: {
            query: {
              id: taskPlan.orderId
            }
          }
        })
        queries.push({
          service: 'agents',
          params: {
            query: {
              id: {
                $in: getAgentIds(currentOrderOrderPlansByAgent)
              }
            }
          }
        })
        queries.push({
          service: 'products',
          params: {
            query: {
              id: {
                $in: getProductIds(currentOrderOrderPlansByAgent)
              }
            }
          }
        })
      }

      if (anyOrderPlansMissingAgentProfiles(currentOrderOrderPlansByAgent)) {
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: {
                $in: getAgentIds(currentOrderOrderPlansByAgent)
              }
            }
          }
        })
      }

      if (anyOrderPlansMissingProductResourceTypes(currentOrderOrderPlansByAgent)) {
        queries.push({
          service: 'resourceTypes',
          params: {
            query: {
              id: {
                $in: getResourceTypeIds(currentOrderOrderPlansByAgent)
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
      if (anyOrderPlansMissingAgents(currentOrderOrderPlansByAgent)) return true
      if (anyOrderPlansMissingProducts(currentOrderOrderPlansByAgent)) return true
      if (anyOrderPlansMissingAgentProfiles(currentOrderOrderPlansByAgent)) return true
      if (anyOrderPlansMissingProductResourceTypes(currentOrderOrderPlansByAgent)) return true

      return false
    }
  })
)(ViewOrderSummaryTask)

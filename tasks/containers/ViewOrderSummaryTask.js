import { isNil, isEmpty, values, flatten, uniq, pipe, prop, map, keys, any, path } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import getViewOrderSummaryTaskProps from '../getters/getViewOrderSummaryTaskProps'
import ViewOrderSummaryTask from '../components/ViewOrderSummaryTask'

import { orders, orderPlans, priceSpecs, products, resourceTypes, orderIntents } from '../../actions'
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
      orderIntents,
      priceSpecs,
      products,
      resourceTypes,
      agents,
      profiles
    },
    query: (props) => {
      var queries = []
      const { taskPlan, selected } = props
      const { currentOrderOrderPlansByAgent, currentOrderOrderIntentsByAgent } = selected

      // order has been commited/closed if order plans exist
      const orderInfoByAgent = !isEmpty(currentOrderOrderPlansByAgent) ? currentOrderOrderPlansByAgent
                                                                       : currentOrderOrderIntentsByAgent

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

        queries.push({
          service: 'orderIntents',
          params: {
            query: {
              orderId
            }
          }
        })
      }

      if (!isEmpty(orderInfoByAgent)) {
        queries.push({
          service: 'priceSpecs',
          params: {
            query: {
              id: {
                $in: getPriceSpecIds(orderInfoByAgent)
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
                $in: getAgentIds(orderInfoByAgent)
              }
            }
          }
        })
        queries.push({
          service: 'products',
          params: {
            query: {
              id: {
                $in: getProductIds(orderInfoByAgent)
              }
            }
          }
        })
      }

      if (anyOrderPlansMissingAgentProfiles(orderInfoByAgent)) {
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: {
                $in: getAgentIds(orderInfoByAgent)
              }
            }
          }
        })
      }

      if (anyOrderPlansMissingProductResourceTypes(orderInfoByAgent)) {
        queries.push({
          service: 'resourceTypes',
          params: {
            query: {
              id: {
                $in: getResourceTypeIds(orderInfoByAgent)
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
      const { currentOrderOrderPlansByAgent, currentOrderOrderIntentsByAgent } = props.selected

      // wait for task plan before re-query
      if (isNil(taskPlan)) return false

      console.log('orderPlans: ', currentOrderOrderPlansByAgent)
      console.log('orderIntents: ', currentOrderOrderIntentsByAgent)

      if (isEmpty(currentOrderOrderPlansByAgent) && isEmpty(currentOrderOrderIntentsByAgent)) return true
      if (anyOrderPlansMissingPriceSpecs(currentOrderOrderPlansByAgent) && anyOrderPlansMissingPriceSpecs(currentOrderOrderIntentsByAgent)) return true
      if (anyOrderPlansMissingAgents(currentOrderOrderPlansByAgent) && anyOrderPlansMissingAgents(currentOrderOrderIntentsByAgent)) return true
      if (anyOrderPlansMissingProducts(currentOrderOrderPlansByAgent) && anyOrderPlansMissingProducts(currentOrderOrderIntentsByAgent)) return true
      if (anyOrderPlansMissingAgentProfiles(currentOrderOrderPlansByAgent) && anyOrderPlansMissingAgentProfiles(currentOrderOrderIntentsByAgent)) return true
      if (anyOrderPlansMissingProductResourceTypes(currentOrderOrderPlansByAgent) && anyOrderPlansMissingProductResourceTypes(currentOrderOrderIntentsByAgent)) return true

      return false
    }
  })
)(ViewOrderSummaryTask)

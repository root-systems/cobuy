import { isNil, isEmpty, values, flatten, uniq, pipe, prop, map, keys, any } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import getViewOrderSummaryTaskProps from '../getters/getViewOrderSummaryTaskProps'
import ViewOrderSummaryTask from '../components/ViewOrderSummaryTask'

import { orders, orderPlans, priceSpecs } from '../../actions'
import { agents, profiles } from 'dogstack-agents/actions'

import anyOrderPlansMissingPriceSpecs from '../util/anyOrderPlansMissingPriceSpecs'
import anyOrderPlansMissingAgents from '../util/anyOrderPlansMissingAgents'
import anyOrderPlansMissingAgentProfiles from '../util/anyOrderPlansMissingAgentProfiles'

export default compose(

  connectFeathers({
    selector: getViewOrderSummaryTaskProps,
    actions: {
      orders,
      orderPlans,
      priceSpecs,
      agents,
      profiles
    },
    query: (props) => {
      var queries = []
      const { taskPlan, selected } = props
      const { currentOrderOrderPlansByAgent } = selected

      const getAgentIds = pipe(
        keys,
        map(parseInt)
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
        const getPriceSpecIds = pipe(
          values,
          flatten,
          map(prop('priceSpecId')),
          uniq
        )

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
          service: 'agents',
          params: {
            query: {
              id: {
                $in: getAgentIds(currentOrderOrderPlansByAgent)
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
      if (anyOrderPlansMissingAgentProfiles(currentOrderOrderPlansByAgent)) return true

      return false
    }
  })
)(ViewOrderSummaryTask)

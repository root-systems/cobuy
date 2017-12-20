import { isNil, path, isEmpty, props } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import getCloseOrderTaskProps from '../getters/getCloseOrderTaskProps'
import CloseOrderTask from '../components/CloseOrderTask'

import { actions as orders } from '../../ordering/dux/orders'

const getAgentIds = props(['adminAgentId', 'consumerAgentId', 'supplierAgentId'])

export default compose(

  connectFeathers({
    selector: getCloseOrderTaskProps,
    actions: {
      orders
    },
    query: (props) => {
      var queries = []

      const { taskPlan, selected } = props
      const { currentOrder } = selected

      if (taskPlan) {
        const { params: { orderId } } = taskPlan
        queries.push({
          service: 'orders',
          id: orderId
        })
      }

      if (currentOrder) {
        const agentIds = getAgentIds(currentOrder)
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
    shouldQueryAgain: (props, status) => {
      if (status.isPending) return false

      const { taskPlan } = props.ownProps
      const { currentOrder } = props.selected

      // wait for task plan before re-query
      if (isNil(taskPlan)) return false
      if (isNil(currentOrder)) return true

      // TODO: IK: this would need additional logic around the admin, consumerAgent, supplierAgent profiles not being available and returning true in order to go fetch them
      // but for now, i'm unsure if this component will even get used in it's current form, so leaving that work till later

      return false
    }
  })
)(CloseOrderTask)

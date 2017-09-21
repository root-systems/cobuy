import { isNil, path } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { actions as orders } from '../../ordering/dux/orders'

import getStartOrderTaskProps from '../getters/getStartOrderTaskProps'
import StartOrderTask from '../components/StartOrderTask'

const getOrderIdFromTaskPlan = path(['params', 'orderId'])

export default compose(
  connectFeathers({
    selector: getStartOrderTaskProps,
    actions: {
      orders
    },
    query: (props) => {
       var queries = []
       const { taskPlan } = props

       if (taskPlan) {
         const { params: { orderId } } = taskPlan
         queries.push({
           service: 'orders',
           id: orderId
         })
       }

       return queries
     },
     shouldQueryAgain: (props, status) => {
       if (status.isPending) return false

       const { taskPlan } = props.ownProps

       // wait for task plan before re-query
       if (isNil(taskPlan)) return false

       // re-query when we haven't gotten back supplierAgent or taskWork
       const orderId = getOrderIdFromTaskPlan(taskPlan)
       if (isNil(orderId)) return true

       return false
     }
  })
)(StartOrderTask)

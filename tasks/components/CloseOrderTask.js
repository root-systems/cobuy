import h from 'react-hyperscript'
import { isNil, merge } from 'ramda'

import SelectAgentForOrder from '../../agents/components/SelectAgentForOrder'

// need to pass down the choices to each instance of the selection component

export default (props) => {
  const { taskPlan, actions, orders, currentAgentGroupProfiles, currentAgentGroupSupplierProfiles, currentAgentGroupMemberProfiles } = props
  if (isNil(taskPlan)) return null
  const { params: { orderId } } = taskPlan
  if (isNil(orderId)) return null

  const currentOrder = orders[orderId]

  // console.log('closing order for: ', currentOrder)
  return h('div', {}, [
    h('h2', {}, 'Closing order for ...')
  ]

  )
}

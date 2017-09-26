import h from 'react-hyperscript'
import { isNil, merge } from 'ramda'

import TaskStepper from './TaskStepper'
import SelectAgentForOrder from '../../agents/components/SelectAgentForOrder'

// need to pass down the choices to each instance of the selection component

export default (props) => {
  const { taskPlan, actions, orders, currentAgentGroupProfiles, currentAgentGroupSupplierProfiles, currentAgentGroupMemberProfiles } = props
  if (isNil(taskPlan)) return null
  const { params: { orderId } } = taskPlan
  if (isNil(orderId)) return null

  const currentOrder = orders[orderId]

  // TODO: IK: filter the supplier profiles based on which group was selected
  // TODO: IK: filter the admin profiles based on which group was selected
  const steps = [
    {
      id: 'tasks.steps.selectGroup',
      content: h(SelectAgentForOrder, {
        agentCollection: currentAgentGroupProfiles,
        selectAgent: (agentId) => {
          actions.orders.update(orderId, merge(currentOrder, { consumerAgentId: agentId }))
        }
      })
    },
    {
      id: 'tasks.steps.selectSupplier',
      content: h(SelectAgentForOrder, {
        agentCollection: currentAgentGroupSupplierProfiles,
        selectAgent: (agentId) => {
          actions.orders.update(orderId, merge(currentOrder, { supplierAgentId: agentId }))
        }
      })
    },
    {
      id: 'tasks.steps.selectAdmin',
      content: h(SelectAgentForOrder, {
        agentCollection: currentAgentGroupMemberProfiles,
        selectAgent: (agentId) => {
          actions.orders.update(orderId, merge(currentOrder, { adminAgentId: agentId }))
        }
      })
    }
  ]

  return h(TaskStepper, {
    steps
  })
}

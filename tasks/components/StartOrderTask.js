import h from 'react-hyperscript'
import { isNil, merge } from 'ramda'

import TaskStepper from './TaskStepper'
import SelectAgentForOrder from '../../agents/components/SelectAgentForOrder'

// need to pass down the choices to each instance of the selection component

export default (props) => {
  const { taskPlan, actions, orders, currentAgentGroupProfiles, currentAgentGroupSupplierProfiles } = props
  if (isNil(taskPlan)) return null
  const { params: { orderId } } = taskPlan
  if (isNil(orderId)) return null

  const currentOrder = orders[orderId]

  const steps = [
    {
      id: 'tasks.steps.selectGroup',
      content: h(SelectAgentForOrder, {
        agentCollection: currentAgentGroupProfiles,
        selectAgent: (agent) => {
          actions.orders.update(orderId, merge(currentOrder, { consumerAgentId: agent.id }))
        }
      })
    },
    {
      id: 'tasks.steps.selectSupplier',
      content: h(SelectAgentForOrder, {
        agentCollection: currentAgentGroupSupplierProfiles,
        selectAgent: (agent) => {
          actions.orders.update(orderId, merge(currentOrder, { supplierAgentId: agent.id }))
        }
      })
    },
    {
      id: 'tasks.steps.selectAdmin',
      content: h(SelectAgentForOrder, {
        selectAgent: (agent) => {
          actions.orders.update(orderId, merge(currentOrder, { adminAgentId: agent.id }))
        }
      })
    }
  ]

  return h(TaskStepper, {
    steps
  })
}

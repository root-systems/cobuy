import h from 'react-hyperscript'
import { isNil, merge } from 'ramda'

import TaskStepper from './TaskStepper'
import SelectAgentForOrder from '../../agents/components/SelectAgentForOrder'

export default (props) => {
  const { taskPlan, actions, orders } = props
  if (isNil(taskPlan)) return null
  const { params: { orderId } } = taskPlan
  if (isNil(orderId)) return null

  const currentOrder = orders[orderId]

  const steps = [
    {
      id: 'tasks.steps.selectGroup',
      content: h(SelectAgentForOrder, {
        selectAgent: (agent) => {
          console.log('agent, ', agent)
          actions.orders.update(orderId, merge(currentOrder, { consumerAgentId: agent.id }))
        }
      })
    },
    {
      id: 'tasks.steps.selectSupplier',
      content: h(SelectAgentForOrder, {
        selectAgent: (agent) => { console.log('agent, ', agent)}
      })
    },
    {
      id: 'tasks.steps.selectAdmin',
      content: h(SelectAgentForOrder, {
        selectAgent: (agent) => { console.log('agent, ', agent)}
      })
    }
  ]

  return h(TaskStepper, {
    steps
  })
}

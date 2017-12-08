import h from 'react-hyperscript'
import { isNil } from 'ramda'

export default (props) => {
  const { taskPlan, currentOrder } = props
  if (isNil(taskPlan)) return null
  if (isNil(currentOrder)) return null
  const { params: { orderId } } = taskPlan
  const { consumerAgentId, supplierAgentId } = currentOrder

  return h('div', {}, [
    h('h2', {}, `Starting order ${orderId} for group ${consumerAgentId} from supplier ${supplierAgentId}`)
  ])
}

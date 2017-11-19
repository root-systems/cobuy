import h from 'react-hyperscript'
import { isNil, path, isEmpty, pipe, any, prop, difference, keys, tap, not, map } from 'ramda'

import TaskStepper from './TaskStepper'
import SelectAgentForOrder from '../../agents/components/SelectAgentForOrder'

import currentAgentMissingAnyGroupProfiles from '../util/currentAgentMissingAnyGroupProfiles'

const getOrderIdFromTaskPlan = path(['params', 'orderId'])
const getIdsFromProfiles = map(prop('id'))
const missingAnyProfiles = pipe(
  difference,
  isEmpty,
  not
)

// need to pass down the choices to each instance of the selection component

export default (props) => {
  const { taskPlan, actions, orders, currentAgent, currentAgentGroupIds, currentAgentGroupProfiles, currentAgentGroupSupplierIds, currentAgentGroupSupplierProfiles, currentAgentGroupMemberIds, currentAgentGroupMemberProfiles } = props
  if (isNil(taskPlan)) return null
  const { params: { orderId } } = taskPlan
  if (isNil(orderId)) return null
  if (isNil(currentAgent)) return null
  if (isEmpty(currentAgentGroupIds)) return null
  if (currentAgentMissingAnyGroupProfiles(currentAgent)) return null
  if (missingAnyProfiles(currentAgentGroupSupplierIds, getIdsFromProfiles(currentAgentGroupSupplierProfiles))) return null
  if (missingAnyProfiles(currentAgentGroupMemberIds, getIdsFromProfiles(currentAgentGroupMemberProfiles))) return null

  const currentOrder = orders[orderId]

  // TODO: IK: filter the supplier profiles based on which group was selected
  // TODO: IK: filter the admin profiles based on which group was selected
  const steps = [
    {
      id: 'tasks.steps.selectGroup',
      content: h(SelectAgentForOrder, {
        agentType: 'group',
        agentCollection: currentAgentGroupProfiles,
        selectedAgent: currentOrder ? currentOrder.consumerAgent: null,
        selectAgent: (agentId) => {
          actions.orders.update(orderId, merge(currentOrder, { consumerAgentId: agentId }))
        }
      })
    },
    {
      id: 'tasks.steps.selectSupplier',
      content: h(SelectAgentForOrder, {
        agentType: 'supplier',
        agentCollection: currentAgentGroupSupplierProfiles,
        selectedAgent: currentOrder ? currentOrder.supplierAgent: null,
        selectAgent: (agentId) => {
          actions.orders.update(orderId, merge(currentOrder, { supplierAgentId: agentId }))
        }
      })
    },
    {
      id: 'tasks.steps.selectAdmin',
      content: h(SelectAgentForOrder, {
        agentType: 'admin',
        agentCollection: currentAgentGroupMemberProfiles,
        selectedAgent: currentOrder ? currentOrder.adminAgent: null,
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

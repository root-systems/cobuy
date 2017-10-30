import { isNil, path, isEmpty } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { actions as orders } from '../../ordering/dux/orders'
import { agents, relationships, profiles } from 'dogstack-agents/actions'

import getCloseOrderTaskProps from '../getters/getCloseOrderTaskProps'
import CloseOrderTask from '../components/CloseOrderTask'

const getOrderIdFromTaskPlan = path(['params', 'orderId'])

export default compose(
  connectFeathers({
    selector: getCloseOrderTaskProps,
    actions: {
      orders,
      agents,
      relationships,
      profiles
    },
    query: (props) => {
      var queries = []
      const { taskPlan, selected } = props
      const { currentAgent, currentAgentGroupIds, currentAgentGroupSupplierIds, currentAgentGroupMemberIds } = selected

      if (taskPlan) {
        const { params: { orderId } } = taskPlan
        queries.push({
          service: 'orders',
          id: orderId
        })
      }

      if (currentAgent) {
        queries.push({
          service: 'relationships',
          params: {
            query: {
              targetId: currentAgent.id
            }
          }
        })
      }

      if (currentAgentGroupIds) {
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: {
                $in: currentAgentGroupIds
              }
            }
          }
        })
        // get suppliers with a relationship to any groups of the currentAgent
        queries.push({
          service: 'relationships',
          params: {
            query: {
              sourceId: {
                $in: currentAgentGroupIds
              },
              relationshipType: 'supplier'
            }
          }
        })
        // get members with a relationship to any groups of the currentAgent
        queries.push({
          service: 'relationships',
          params: {
            query: {
              sourceId: {
                $in: currentAgentGroupIds
              },
              relationshipType: 'member'
            }
          }
        })
      }

      if (currentAgentGroupSupplierIds) {
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: {
                $in: currentAgentGroupSupplierIds
              }
            }
          }
        })
      }

      if (currentAgentGroupMemberIds) {
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: {
                $in: currentAgentGroupMemberIds
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
      const {
        currentAgent,
        currentAgentGroupIds,
        currentAgentGroupProfiles,
        currentAgentGroupSupplierIds,
        currentAgentGroupSupplierProfiles
      } = props.selected

       // wait for task plan before re-query
      if (isNil(taskPlan)) return false

       // re-query when we haven't gotten back supplierAgent or taskWork
      const orderId = getOrderIdFromTaskPlan(taskPlan)

      if (isNil(orderId)) return true

      if (isNil(currentAgent)) return true

      if (isEmpty(currentAgentGroupIds)) return true
      //
      if (isEmpty(currentAgentGroupProfiles)) return true
      //
      if (isEmpty(currentAgentGroupSupplierIds)) return true

      if (isEmpty(currentAgentGroupSupplierProfiles)) return true

      // TODO: IK: not sure how we should do this one, given the currentAgent is always part of currentAgentGroupMemberIds
      // but they also could legitimately be the only one
      // if (isEmpty(currentAgentGroupMemberIds)) return true

      // if (isEmpty(currentAgentGroupMemberProfiles)) return true

      return false
    }
  })
)(CloseOrderTask)

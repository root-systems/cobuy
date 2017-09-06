import { isNil, path, prop, pipe, values, any, forEach, either } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { agents, profiles, relationships, credentials } from 'dogstack-agents/actions'
import getSetupGroupTaskProps from '../getters/getSetupGroupTaskProps'
import SetupSupplierTask from '../components/SetupSupplierTask'

const getSupplierAgentFromTaskPlan = path(['params', 'supplierAgent'])

import {products, priceSpecs, resourceTypes} from '../../actions'

export default compose(
  connectFeathers({
    selector: getSetupGroupTaskProps,
    actions: {
      agents,
      profiles,
      relationships,
      credentials,
      products,
      priceSpecs,
      resourceTypes
    },
    // TODO can optimize `feathers-action-react` to de-dupe
    // new queries by checking if deepEqual
    query: (props) => {
      var queries = []
      //  once we have the task plan, query for the supplier agent
      const { taskPlan } = props

      if (taskPlan) {
        const { params: { supplierAgentId } } = taskPlan
        queries.push({
          service: 'agents',
          id: supplierAgentId
        })
        queries.push({
          service: 'profiles',
          params: {
            query: {
              agentId: supplierAgentId
            }
          }
        })
        queries.push({
          service: 'products',
          params: {
            query: {
              supplierAgentId
            }
          }
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
      const supplierAgent = getSupplierAgentFromTaskPlan(taskPlan)
      if (isNil(supplierAgent)) return true

      return false
    }
  })
)(SetupSupplierTask)

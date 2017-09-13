import { isNil, path, prop, pipe, values, any, forEach, either } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { agents, profiles, relationships, credentials } from 'dogstack-agents/actions'
import getSetupSupplierTaskProps from '../getters/getSetupSupplierTaskProps'
import SetupSupplierTask from '../components/SetupSupplierTask'

const getSupplierAgentFromTaskPlan = path(['params', 'supplierAgent'])

import { products, priceSpecs, resourceTypes } from '../../actions'

export default compose(
  connectFeathers({
    selector: getSetupSupplierTaskProps,
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
      const { taskPlan, selected } = props

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

      const { products } = selected

      if (products) {
        products.forEach(product => {
          queries.push({
            service: 'resourceTypes',
            id: product.resourceTypeId
          })
          queries.push({
            service: 'priceSpecs',
            params: {
              query: {
                productId: product.id
              }
            }
          })
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

      if (anyProductsAreMissingDetails(props.selected)) {
        return true
      }

      return false
    }
  })
)(SetupSupplierTask)

const anyProductsAreMissingDetails = pipe(
  prop('products'),
  any(pipe(path(['resourceType', 'id']), isNil))
)

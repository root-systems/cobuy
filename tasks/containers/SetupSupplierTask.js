import { isNil, path, prop, pipe, values, any, forEach, either, map, isEmpty, groupBy, ifElse, equals } from 'ramda'
import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import { agents, profiles, relationships, credentials } from 'dogstack-agents/actions'
import getSetupSupplierTaskProps from '../getters/getSetupSupplierTaskProps'
import SetupSupplierTask from '../components/SetupSupplierTask'

const getSupplierAgentFromTaskPlan = path(['params', 'supplierAgent'])

import { products, priceSpecs, resourceTypes, orders } from '../../actions'

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
      resourceTypes,
      orders
    },
    // TODO can optimize `feathers-action-react` to de-dupe
    // new queries by checking if deepEqual
    query: (props) => {
      var queries = []
      //  once we have the task plan, query for the supplier agent
      const { taskPlan, selected } = props

      if (taskPlan) {
        const { params: { supplierAgentId, orderId } } = taskPlan
        queries.push({
          service: 'orders',
          id: orderId
        })
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
    shouldQueryAgain: (props, status, prevProps, prevStatus) => {
      if (status.isPending) return false

      const { taskPlan } = props.ownProps

      // wait for task plan before re-query
      if (isNil(taskPlan)) return false

      // re-query when we haven't gotten back supplierAgent or taskWork
      const supplierAgent = getSupplierAgentFromTaskPlan(taskPlan)
      if (isNil(supplierAgent)) return true

      const { selected } = props
      if (hasNotQueriedForProducts({ selected, status })) {
        return true
      }

      const productIds = getProductIds(props.selected)
      const prevProductIds = getProductIds(prevProps.selected)
      if (!equals(productIds, prevProductIds)) return true

      return false
    }
  })
)(SetupSupplierTask)

const getProductIds = pipe(
  prop('products'),
  map(prop('id'))
)

const hasNotQueriedForProducts = ifElse(
  pipe(path(['selected', 'products']), isEmpty),
  pipe(
    path(['status', 'requests']),
    values,
    groupBy(prop('service')),
    pipe(prop('products'), either(isNil, isEmpty)),
  ),
  pipe(
    path(['status', 'requests']),
    values,
    groupBy(prop('service')),
    either(
      pipe(prop('products'), either(isNil, isEmpty)),
      pipe(prop('resourceTypes'), either(isNil, isEmpty)),
      pipe(prop('priceSpecs'), either(isNil, isEmpty))
    )
  )
)

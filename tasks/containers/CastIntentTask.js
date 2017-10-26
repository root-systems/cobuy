import { connect as connectFeathers } from 'feathers-action-react'
import { isNil, path, prop, pipe, values, any, forEach, either, map, isEmpty, groupBy, ifElse } from 'ramda'
import { compose } from 'recompose'
import { push } from 'react-router-redux'

import getCastIntentTaskProps from '../getters/getCastIntentTaskProps'
import CastIntentTask from '../components/CastIntentTask'

const getSupplierAgentFromTaskPlan = path(['params', 'supplierAgent'])
import { agents, profiles, relationships } from 'dogstack-agents/actions'
import { products, priceSpecs, resourceTypes, orderIntents, orders } from '../../actions'

const getResourceTypeIdsFromProducts = pipe(
  map(prop('resourceTypeId')),
  values
)

const getProductIdsFromProducts = pipe(
  map(prop('id')),
  values
)

export default compose(
  connectFeathers({
    selector: getCastIntentTaskProps,
    actions: {
      agents,
      profiles,
      products,
      relationships,
      resourceTypes,
      priceSpecs,
      orderIntents,
      orders,
      // `feathers-action-react` wraps every
      //  action creator in a cid creator.
      router: {
        push: (cid, ...args) => push(...args)
      }
    },
    query: (props) => {
      var queries = []
      const {taskPlan, selected} = props
      if (taskPlan) {
        const { params: { orderId } } = taskPlan
        queries.push({
          service: 'orders',
          params: {
            query: {
              id: orderId
            }
          }
        })
        queries.push({
          service: 'orderIntents',
          params: {
            query: {
              orderId
            }
          }
        })
      }
      if (!isNil(selected.order)) {
        const { params: { orderId } } = taskPlan
        const { supplierAgentId } = selected.order
        queries.push({
          service: 'products',
          params: {
            query: {
              supplierAgentId
            }
          }
        })
      }

      if (!isEmpty(selected.products)) {
        const resourceTypeIds = getResourceTypeIdsFromProducts(selected.products)
        queries.push({
          service: 'resourceTypes',
          params: {
            query: {
              id: {
                $in: resourceTypeIds
              }
            }
          }
        })

        const productIds = getProductIdsFromProducts(selected.products)
        queries.push({
          service: 'priceSpecs',
          params: {
            query: {
              productId: {
                $in: productIds
              }
            }
          }
        })
      }

      return queries
    },
    shouldQueryAgain: (props, status) => {
      if (status.isPending) return false
      const { selected } = props

      if (hasNotQueriedForProducts({ status, selected })) {
        return true
      }

      return false
    }
  })
)(CastIntentTask)

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

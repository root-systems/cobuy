import { connect as connectFeathers } from 'feathers-action-react'
import { isNil, path, prop, pipe, values, any, forEach, either, map, isEmpty } from 'ramda'
import { compose } from 'recompose'
import { push } from 'react-router-redux'

import getCastIntentTaskProps from '../getters/getCastIntentTaskProps'
import CastIntentTask from '../components/CastIntentTask'

const getSupplierAgentFromTaskPlan = path(['params', 'supplierAgent'])
import { agents, profiles, relationships } from 'dogstack-agents/actions'
import { products, priceSpecs, resourceTypes, orderIntents } from '../../actions'


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
      // `feathers-action-react` wraps every
      //  action creator in a cid creator.
      router: {
        push: (cid, ...args) => push(...args)
      }
    },
    query: (props) => {
      var queries = []
      const {taskPlan, selected} = props
      console.log(taskPlan, 'the task plan')
      if (taskPlan) {
        const { params: {supplierAgentId} } = taskPlan
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
        const resourceTypeIds = values(map((product) => {
          return product.resourceTypeId
        }, selected.products))
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
      }
      if (!isEmpty(selected.products)) {
        const productIds = values(map((product) => {
          return product.id
        }, selected.products))
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
      queries.push({
        service: 'orderIntents',
        params: {
          query: {
            orderId: taskPlan.params.orderId
          }
        }
      })

      return queries
    },
    shouldQueryAgain: (props, status) => {
      if (status.isPending) return false

      const { taskPlan } = props.ownProps

      // wait for task plan before re-query
      // if (isNil(taskPlan)) return false

      // re-query when we haven't gotten back supplierAgent or taskWork
      // const supplierAgent = getSupplierAgentFromTaskPlan(taskPlan)
      // if (anyProductsAreMissingDetails(props.selected)) {
      //   return true
      //
      if (isEmpty(props.selected.resourceTypes)) return true


      return false
    }
  })
)(CastIntentTask)

const anyProductsAreMissingDetails = pipe(
  prop('products'),
  any(pipe(path(['resourceType']), isNil))
)

import { connect as connectFeathers } from 'feathers-action-react'
import { compose } from 'recompose'

import getCastIntentTaskProps from '../getters/getCastIntentTaskProps'
import CastIntentTask from '../components/CastIntentTask'

import { agents, profiles, relationships } from 'dogstack-agents/actions'
import { products, priceSpecs, resourceTypes } from '../../actions'

export default compose(
  connectFeathers({
    selector: getCastIntentTaskProps,
    actions: {
      agents,
      profiles,
      products,
      relationships,
      resourceTypes,
      priceSpecs
    },
    query: (props) => {
      var queries = []
      const {taskPlan} = props
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
        queries.push({
          service: 'resourceTypes',
          params: {
            query: {
              supplierAgentId
            }
          }
        })
      }
      return queries
    }
  })
)(CastIntentTask)

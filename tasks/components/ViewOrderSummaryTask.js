import h from 'react-hyperscript'
import { isEmpty } from 'ramda'
import { isNil, prop, any, pipe, values, tap, flatten, map } from 'ramda'

import OrderSummary from '../../ordering/components/OrderSummary'

import anyOrderPlansMissingPriceSpecs from '../util/anyOrderPlansMissingPriceSpecs'
import anyOrderPlansMissingAgents from '../util/anyOrderPlansMissingAgents'
import anyOrderPlansMissingProducts from '../util/anyOrderPlansMissingProducts'
import anyOrderPlansMissingAgentProfiles from '../util/anyOrderPlansMissingAgentProfiles'
import anyOrderPlansMissingProductResourceTypes from '../util/anyOrderPlansMissingProductResourceTypes'

export default (props) => {
  console.log('view order summary task props is: ', props)
  const { currentOrderOrderPlansByAgent, currentOrderOrderIntentsByAgent } = props
  if (isEmpty(currentOrderOrderPlansByAgent) && isEmpty(currentOrderOrderIntentsByAgent)) return null
  if (anyOrderPlansMissingPriceSpecs(currentOrderOrderPlansByAgent) && anyOrderPlansMissingPriceSpecs(currentOrderOrderIntentsByAgent)) return null
  if (anyOrderPlansMissingAgents(currentOrderOrderPlansByAgent) && anyOrderPlansMissingAgents(currentOrderOrderIntentsByAgent)) return null
  if (anyOrderPlansMissingProducts(currentOrderOrderPlansByAgent) && anyOrderPlansMissingProducts(currentOrderOrderIntentsByAgent)) return null
  if (anyOrderPlansMissingAgentProfiles(currentOrderOrderPlansByAgent) && anyOrderPlansMissingAgentProfiles(currentOrderOrderIntentsByAgent)) return null
  if (anyOrderPlansMissingProductResourceTypes(currentOrderOrderPlansByAgent) && anyOrderPlansMissingProductResourceTypes(currentOrderOrderIntentsByAgent)) return null
  return h(OrderSummary, props)
}

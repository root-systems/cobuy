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
  const { currentOrderOrderPlansByAgent } = props
  if (isEmpty(currentOrderOrderPlansByAgent)) return null
  if (anyOrderPlansMissingPriceSpecs(currentOrderOrderPlansByAgent)) return null
  if (anyOrderPlansMissingAgents(currentOrderOrderPlansByAgent)) return null
  if (anyOrderPlansMissingProducts(currentOrderOrderPlansByAgent)) return null
  if (anyOrderPlansMissingAgentProfiles(currentOrderOrderPlansByAgent)) return null
  if (anyOrderPlansMissingProductResourceTypes(currentOrderOrderPlansByAgent)) return null
  return h(OrderSummary, props)
}

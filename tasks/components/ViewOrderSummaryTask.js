import h from 'react-hyperscript'
import { isEmpty } from 'ramda'
import { isNil, prop, any, pipe, values, tap, flatten, map } from 'ramda'

import OrderSummary from '../../ordering/components/OrderSummary'

import currentOrderMissingAgents from '../util/currentOrderMissingAgents'
import currentOrderMissingProfiles from '../util/currentOrderMissingProfiles'
import anyOrderPlansMissingPriceSpecs from '../util/anyOrderPlansMissingPriceSpecs'
import anyOrderPlansMissingAgents from '../util/anyOrderPlansMissingAgents'
import anyOrderPlansMissingProducts from '../util/anyOrderPlansMissingProducts'
import anyOrderPlansMissingAgentProfiles from '../util/anyOrderPlansMissingAgentProfiles'
import anyOrderPlansMissingProductResourceTypes from '../util/anyOrderPlansMissingProductResourceTypes'

export default (props) => {
  const { currentOrder, currentOrderOrderPlansByAgent } = props
  if (isNil(currentOrder)) return null
  if (currentOrderMissingAgents(currentOrder)) return null
  if (currentOrderMissingProfiles(currentOrder)) return null
  if (isEmpty(currentOrderOrderPlansByAgent)) return null
  if (anyOrderPlansMissingPriceSpecs(currentOrderOrderPlansByAgent)) return null
  if (anyOrderPlansMissingAgents(currentOrderOrderPlansByAgent)) return null
  if (anyOrderPlansMissingProducts(currentOrderOrderPlansByAgent)) return null
  if (anyOrderPlansMissingAgentProfiles(currentOrderOrderPlansByAgent)) return null
  if (anyOrderPlansMissingProductResourceTypes(currentOrderOrderPlansByAgent)) return null
  return h(OrderSummary, props)
}

import h from 'react-hyperscript'
import { isEmpty } from 'ramda'
import { isNil, prop, any, pipe, values, tap, flatten, map } from 'ramda'

import OrderSummary from '../../ordering/components/OrderSummary'

import anyOrderPlansMissingPriceSpecs from '../util/anyOrderPlansMissingPriceSpecs'

export default (props) => {
  const { currentOrderOrderPlansByAgent } = props
  if (isEmpty(currentOrderOrderPlansByAgent)) return null
  if (anyOrderPlansMissingPriceSpecs(currentOrderOrderPlansByAgent)) return null
  return h(OrderSummary, props)
}

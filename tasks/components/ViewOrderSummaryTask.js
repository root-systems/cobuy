import h from 'react-hyperscript'
import { isEmpty } from 'ramda'

import OrderSummary from '../../ordering/components/OrderSummary'

export default (props) => {
  const { currentOrderOrderPlansByAgent } = props
  if (isEmpty(currentOrderOrderPlansByAgent)) return false
  return h(OrderSummary, props)
}

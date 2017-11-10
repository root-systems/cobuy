import h from 'react-hyperscript'
import { isNil } from 'ramda'

import OrderSummary from '../../ordering/components/OrderSummary'

export default (props) => {
  const { currentOrderOrderPlans } = props
  if (isNil(currentOrderOrderPlans)) return false
  return h(OrderSummary, props)
}

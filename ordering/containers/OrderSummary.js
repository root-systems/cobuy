import h from 'react-hyperscript'
import { compose } from 'recompose'

// Only mock data at the stage, nothing in state or feathers.
import getOrderSummaryProps from '../getters/getOrderSummaryProps'
import OrderSummary from '../components/OrderSummary'

export default compose(
)(props => {
  return h(OrderSummary, { order: getOrderSummaryProps })
})

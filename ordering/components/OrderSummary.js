import { compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import h from 'react-hyperscript'

import AgentOrderSummary from './AgentOrderSummary'
import SupplierOrderSummary from './SupplierOrderSummary'

function OrderSummary (props) {
  const { currentOrder, summedOrderPlansPerProduct, currentOrderOrderPlansByAgent } = props

  return h('div', [
    h(AgentOrderSummary, { orderPlans: currentOrderOrderPlansByAgent }),
    h(SupplierOrderSummary, {
      order: currentOrder,
      orderPlans: summedOrderPlansPerProduct
    }),
  ])
}

export default compose(
  // connectFela(styles)
)(OrderSummary)

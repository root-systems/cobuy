import { createStructuredSelector } from 'reselect'
import getOrders from '../../ordering/getters/getOrders'

export default createStructuredSelector({
  orders: getOrders
})

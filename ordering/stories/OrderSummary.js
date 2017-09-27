import React from 'react'
import { storiesOf } from '@storybook/react'
import products from './mock/products'

import OrderSummary from '../components/OrderSummary'

// https://github.com/root-systems/cobuy/wiki/Models#offering
const supplier = {
  name: 'Central Nuts'
}

const order = {
  dateCompleted: '',
  totalPrice: '',
  supplier,
  products
}

storiesOf('ordering.orderSummary', module)
  .add('default', () => (
    <OrderSummary />
  ))

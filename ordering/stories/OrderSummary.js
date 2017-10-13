import React from 'react'
import { storiesOf } from '@storybook/react'
import order from './mock/order'

import OrderSummary from '../components/OrderSummary'

storiesOf('ordering.orderSummary', module)
  .add('default', () => (
    <OrderSummary order={order} />
  ))

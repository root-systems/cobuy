import React from 'react'
import { storiesOf } from '@storybook/react'
import products from './mock/products'

import OrderSummary from '../components/OrderSummary'

/*
  Ideal data shape for grouping by agents

  {
    agents: [
      {
        agent,
        orderPlans
      }
    ]
  }
  {
    agent,
    orderplans:

  }
*/

const agent = {
  profile: {
    name: 'Ella Banks'
  }
}

// desired order, optimistic thinking
const intents = [{
  // agent that made the order
  desiredQuantity: 1,
  minimumQuantity: 1,
  maximumQuantity: 2,
  productId: products[0].id,
  product: products[0],
  priceSpecId: 456
}]

// What has actually happened
const orderPlans = [{
  quantity: 1,
  intent: intents[0]
}]

const orderSummary = {
  agentOrderPlans: [
    {
      agent,
      orderPlans
    }
  ]
}

storiesOf('ordering.orderSummary', module)
  .add('default', () => (
    <OrderSummary orderSummary={orderSummary} />
  ))

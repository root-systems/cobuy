import React from 'react'
import { storiesOf } from '@storybook/react'
import products from './mock/products'

import OrderSummary from '../components/OrderSummary'

/*
  OrderPlan
  Like an invoice - the whole group's order that's going to be executed and sent to the supplier

      agent
      order
      offering
      resource(Type)
      quantity
----------------------
      Order

      products
      intents
      plans
      name
      description

-----------------------

OrderIntent

  unique per agent, order, resource(Type)

  An individual's desired order

      agent
      order
      resource(Type)
      desiredQuantity
      minimumQuantity
      maximumQuantity

*/

const agent = {
  profile: {
    name: 'Ella Banks'
  }
}

// desired order, optimistic thinking
const intents = [{
  // agent that made the order
  agent,
  desiredQuantity: 1,
  minimumQuantity: 1,
  maximumQuantity: 2,
  productId: products[0].id,
  product: products[0],
  priceSpecId: 456
}]

// What has actually happened
const orderPlan = {
  quantity: 1,
  intent: intents[0]
}

const orderSummary = {
  orderPlans: [
    orderPlan
  ]
}

storiesOf('ordering.orderSummary', module)
  .add('default', () => (
    <OrderSummary orderSummary={orderSummary} />
  ))

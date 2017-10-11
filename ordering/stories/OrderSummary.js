import React from 'react'
import { storiesOf } from '@storybook/react'
import products from './mock/products'

import OrderSummary from '../components/OrderSummary'

const agents = [{
  profile: {
    name: 'Ella Banks'
  }
},
{
  profile: {
    name: 'Kath Uru'
  }
}]

// desired order, optimistic thinking
const intents = products.map((product) => {
  return {
    desiredQuantity: 1,
    minimumQuantity: 1,
    maximumQuantity: 2,
    productId: product.id,
    product: product,
    priceSpecId: product.priceSpecs[0].id
  }
})
// What has actually happened
const orderPlans = intents.map((intent) => {
  return {
    quantity: Math.floor(Math.random() * 6) + 1,
    intent
  }
})

const agentOrderPlans = agents.map((agent) => {
  return {
    agent,
    orderPlans
  }
})

storiesOf('ordering.orderSummary', module)
  .add('default', () => (
    <OrderSummary agentOrderPlans={agentOrderPlans} />
  ))

import React from 'react'
import { storiesOf } from '@storybook/react'
import products from './mock/products'

import OrderSummary from '../components/OrderSummary'


/*
Start plumbing with a fake route
Add some fake button sa we don't know if it's task based

create container with fake data


order
  orderIntents
    agent
    disiredQuantity
    productId
    priceSpecId
  orderPlans
    agent
    quantity
    productId
    priceSpecId
*/

const agents = [{
  profile: {
    id: 121,
    name: 'Ella Banks'
  }
},
{
  profile: {
    id: 334,
    name: 'Kath Uru'
  }
}]

// desired order, optimistic thinking
// order summary does not care about intents, but is part of the order data shape
// not needed
const orderIntents = []

// What actually happened
const orderPlans = products.map((product) => {
  return {
    agent: agents[Math.floor(Math.random() * 2)],
    quantity: Math.floor(Math.random() * 6) + 1,
    productId: product.id,
    product: product,
    priceSpecId: product.priceSpecs[0].id
  }
})

const order = {
  orderIntents,
  orderPlans
}

storiesOf('ordering.orderSummary', module)
  .add('default', () => (
    <OrderSummary order={order} />
  ))

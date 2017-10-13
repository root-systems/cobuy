import products from './products'

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

export default {
  orderIntents,
  orderPlans
}

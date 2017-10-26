import products from './products'

const agents = [{
  profile: {
    id: 121,
    name: 'Ella Banks'
  }
}, {
  profile: {
    id: 334,
    name: 'Kath Uru'
  }
}]

const groups = [{
  profile: {
    id: 903,
    name: "Ruru Kāhui Ako",
    description: "Ruru Kāhui Ako",
    contactInfo: {
      contactPerson: 'Tina Turner',
      deliveryAddress: {
        addressLine1: '13 The Street',
        city: 'The City',
        postcode: '1234'
      },
      billingAddress: {
        addressLine1: 'PO Box 789',
        addressLine2: 'City Mail Centre',
        city: 'The City',
        postcode: '1234'
      },
      email: 'tina@ruru.nz',
      phone: {
        main: '06-1234567',
        mobile: '022-3344556'
      }
    }
  }
}, {
  profile: {
    id: 904,
    name: "School Supplies R'Us",
    description: "If you're yearning for some learning, we'll set your mind churning",
    contactInfo: {
      contactPerson: 'Juliet Carpenter',
      deliveryAddress: {
        addressLine1: '11 The Street',
        city: 'Auckland',
        postcode: '9876'
      },
      billingAddress: {
        addressLine1: 'PO Box 567',
        addressLine2: 'Auckland Mail Centre',
        city: 'Auckland',
        postcode: '9876'
      },
      email: 'tina@schoolsuppliesrus.nz',
      phone: {
        main: '03-9876543',
        mobile: '022-9988776'
      }
    }
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

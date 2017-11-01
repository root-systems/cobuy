const hasher = require('feathers-authentication-local/lib/utils/hash')
const { flatten, map, pick, merge } = require('ramda')

const groups = [
  {
    name: "Ruru Kāhui Ako",
    description: "Ruru Kāhui Ako"
  },
  {
    name: "School Supplies R'Us",
    description: "If you're yearning for some learning, we'll set your mind churning"
  }
]

const products = [
  {
    name: "Laptop Pro 3",
    description: "The latest and greatest for passing the tough test",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR71MqHHl8WFQ-Llf3EEJJSnBMKDRKqxyoWr0DMXEj0RgSrpS0W",
    priceSpecs: [
      {
        minimum: 10,
        price: 500,
        currency: 'NZD'
      },
      {
        minimum: 100,
        price: 300,
        currency: 'NZD'
      }
    ]
  },
  {
    name: "Ergo-Chair 9000",
    description: "Relax your back - why not buy a stack?",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZGA_ssdCo0LgwYGkR-QT03hegiqELsyPgB2drk6PzS6zV8uX",
    priceSpecs: [
      {
        minimum: 100,
        price: 100,
        currency: 'NZD'
      },
      {
        minimum: 500,
        price: 50,
        currency: 'NZD'
      }
    ]
  },
  {
    name: "The AllDesk",
    description: "Just the right height for students and teachers alike. Also comes in dark or light",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0GW5TvkcWjaLTDg2-vQPcL5j5r9igWASYzSerQh_eQ2cVuyqY",
    priceSpecs: [
      {
        minimum: 100,
        price: 250,
        currency: 'NZD'
      },
      {
        minimum: 1000,
        price: 120,
        currency: 'NZD'
      }
    ]
  },
  {
    name: "E-Tablet 2018",
    description: "Let's be clear, you can work from anywhere",
    image: "http://static1.cdn.gadgetreview.com/wp-content/uploads/2014/08/android-tablet-reviews.png.pagespeed.ce.N6mQw8Ya_r.png",
    priceSpecs: [
      {
        minimum: 10,
        price: 300,
        currency: 'NZD'
      },
      {
        minimum: 100,
        price: 100,
        currency: 'NZD'
      }
    ]
  },
  {
    name: "RetrOHP",
    description: "Don't look like a clown if the wi-fi's down",
    image: "https://images-na.ssl-images-amazon.com/images/I/61VZdTVJaWL._SL1300_.jpg",
    priceSpecs: [
      {
        minimum: 10,
        price: 3000,
        currency: 'NZD'
      },
      {
        minimum: 20,
        price: 2000,
        currency: 'NZD'
      }
    ]
  },
  {
    name: "Vision 8",
    description: "Are you ready for the technological yield? Welcome to education in the expanded field",
    image: "https://edge.alluremedia.com.au/m/l/2016/06/samsung_gear_vr_1.jpg",
    priceSpecs: [
      {
        minimum: 5,
        price: 1000,
        currency: 'NZD'
      },
      {
        minimum: 50,
        price: 700,
        currency: 'NZD'
      }
    ]
  }
]

const agents = [
  {
    name: 'Dan Lewis',
    description: "I'm Dan - I love building things, from sheds to organisations",
    avatar: 'https://raw.githubusercontent.com/root-systems/handbook/master/members/dan.png',
    email: 'dan@rootsystems.nz',
    password: 'password'
  },
  {
    name: 'Iain Kirkpatrick',
    description: "I'm Iain - I love basketball and programming while watching basketball",
    avatar: 'https://raw.githubusercontent.com/root-systems/handbook/master/members/iain.png',
    email: 'iain@rootsystems.nz',
    password: 'password'
  },
  {
    name: 'Sarah Rogers',
    description: "I'm Sarah - I love bargain hunting and adding to my vast repertoire of Simpsons knowledge",
    avatar: 'https://raw.githubusercontent.com/root-systems/handbook/master/members/sarah.png',
    email: 'sarah@rootsystems.nz',
    password: 'password'
  },
  {
    name: 'Mikey Williams',
    description: "I'm Mikey - I love making mad science and participating in cooperative ecosystems",
    avatar: 'https://raw.githubusercontent.com/root-systems/handbook/master/members/mikey.png',
    email: 'mikey@rootsystems.nz',
    password: 'password'
  },
  {
    name: 'Michael Smith',
    description: "I'm Michael - I love exploring the globe and wearing radical socks",
    avatar: 'https://raw.githubusercontent.com/root-systems/handbook/master/members/michael.png',
    email: 'michael@rootsystems.nz',
    password: 'password'
  }
]

exports.seed = function (knex, Promise) {
  var groupId, supplierId
  // insert group / supplier agents
  return Promise.all([
    knex('agents').insert({ type: 'group' }).returning('id'),
    knex('agents').insert({ type: 'group' }).returning('id')
  ])
  .then((ids) => {
    ids = flatten(ids)
    groupId = ids[0]
    supplierId = ids[1]
    // insert group profiles
    return Promise.all(groups.map((group, i) => {
      const profile = merge(group, { agentId: ids[i] })
      return knex('profiles').insert(profile).returning('agentId')
    }))
  })
  .then(() => {
    // insert supplier relationships
    return knex('relationships').insert({
      relationshipType: 'supplier',
      sourceId: groupId,
      targetId: supplierId
    })
  })
  .then(() => {
    // insert supplier resourceTypes, products, priceSpecs
    return Promise.all(products.map((product, i) => {
      const resourceType = pick(['name', 'description', 'image'], product)
      return knex('resourceTypes').insert(resourceType).returning('id')
    }))
    .then((ids) => {
      ids = flatten(ids)
      return Promise.all(products.map((product, i) => {
        const prod = { resourceTypeId: ids[i], supplierAgentId: supplierId }
        return knex('products').insert(prod).returning('id')
      }))
    })
    .then((ids) => {
      ids = flatten(ids)
      return Promise.all(products.map((product, i) => {
        return Promise.all(product.priceSpecs.map((priceSpec) => {
          const pSpec = merge(pick(['minimum', 'price', 'currency'], priceSpec), { productId: ids[i] })
          return knex('priceSpecs').insert(pSpec).returning('id')
        }))
      }))
    })
  })
  .then(() => {
    // insert agents
    const devPersonAgent = {}
    return Promise.all([
      knex('agents').insert(devPersonAgent).returning('id'),
      knex('agents').insert(devPersonAgent).returning('id'),
      knex('agents').insert(devPersonAgent).returning('id'),
      knex('agents').insert(devPersonAgent).returning('id'),
      knex('agents').insert(devPersonAgent).returning('id')
    ])
  })
  .then((ids) => {
    ids = flatten(ids)
    // insert person profiles
    return Promise.all(agents.map((agent, i) => {
      const profile = merge(pick(['name', 'description', 'avatar'], agent), { agentId: ids[i] })
      return knex('profiles').insert(profile).returning('agentId')
    }))
  })
  .then((ids) => {
    ids = flatten(ids)
    // hash person credentials
    return Promise.all(agents.map((agent, i) => {
      const credential = merge(pick(['email', 'password'], agent), { agentId: ids[i] })
      return hashCredential(credential)
    }))
    .then((credentials) => {
      // insert person credentials
      return Promise.all(credentials.map((credential) => {
        return knex('credentials').insert(credential).returning('agentId')
      }))
    })
    // not sure why, but credentials .returning doesn't return the correct agentIds, hack for now
    .then(() => ids)
  })
  .then((ids) => {
    // insert member relationships
    return Promise.all(agents.map((agent, i) => {
      const relationship = {
        relationshipType: 'member',
        sourceId: groupId,
        targetId: ids[i]
      }
      return knex('relationships').insert(relationship).returning('targetId')
    }))
    // not sure why, but relationships .returning doesn't return the correct agentIds, hack for now
    .then(() => ids)
  })
  .then((ids) => {
    // insert admin relationship for first group member
    const relationship = {
      relationshipType: 'admin',
      sourceId: groupId,
      targetId: ids[0]
    }
    return knex('relationships').insert(relationship)
  })
}

function hashCredential (credential) {
  return hasher(credential.password)
    .then(hashedPassword => {
      return Object.assign(credential, { password: hashedPassword })
    })
}

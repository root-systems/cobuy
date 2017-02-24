const { keys } = Object
const assign = require('object-assign')
const { pull } = require('catstack')

const data = {
  1: {
    currency: 'NZD',
    supplys: [{
      name: 'avocado',
      batchSize: {
        value: 5,
        unit: 'kg'
      },
      costFunction: [{
        minBatches: 2,
        pricePerBatch: 20
      }, {
        minBatches: 5,
        pricePerBatch: 15
      }]
    }, {
      name: 'apple',
      batchSize: {
        value: 7,
        unit: 'kg'
      },
      costFunction: [{
        minBatches: 3,
        pricePerBatch: 10
      }, {
        minBatches: 10,
        pricePerBatch: 7
      }]
    }, {
      name: 'plum',
      batchSize: {
        value: 3,
        unit: 'kg'
      },
      costFunction: [{
        minBatches: 4,
        pricePerBatch: 12
      }, {
        minBatches: 8,
        pricePerBatch: 10
      }]
    }]
  }
}

module.exports = {
  manifest: {
    all: 'source',
    get: 'async'
  },
  create: (api) => ({
    methods: {
      all: function () {
        const orders = keys(data)
          .map(id => assign({ id }, data[id]))
        return pull.values(orders)
      },
      get: function ({ id }, cb) {
        cb(null, assign({ id }, data[id]))
      }
    }
  })
}

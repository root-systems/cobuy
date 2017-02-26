const groupBy = require('lodash/fp/groupBy')

module.exports = {
  needs: {
    'consumerIntents.get.consumerIntents': 'first'
  },
  create: (api) => [
    api.consumerIntents.get.consumerIntents,
    groupBy('orderId')
  ]
}

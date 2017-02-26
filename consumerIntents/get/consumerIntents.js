const assign = require('lodash/fp/assign')
const mapValues = require('lodash/fp/mapValues')
const mapValuesWithKey = mapValues.convert({ cap: false })

module.exports = {
  needs: {
    'consumerIntents.get.rawConsumerIntents': 'first'
  },
  create: (api) => [
    api.consumerIntents.get.rawConsumerIntents,
    mapValuesWithKey(getConsumerIntent)
  ]
}

function getConsumerIntent (consumerIntent, consumerIntentId) {
  return assign(consumerIntent, {
    id: consumerIntentId
  })
}

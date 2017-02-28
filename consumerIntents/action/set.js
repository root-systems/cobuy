const assign = require('lodash/fp/assign')

module.exports = {
  create: (api) => ({
    update: (model, consumerIntent) => ({
      model: assign(model, {
        [consumerIntent.id]: consumerIntent
      })
    })
  })
}

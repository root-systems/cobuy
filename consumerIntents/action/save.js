const assign = require('lodash/fp/assign')

module.exports = {
  needs: ['consumerIntents.effect.save', 'first'],
  create: (api) => ({
    update: (model, consumerIntent) => ({
      model,
      effect: api.consumerIntents.effect.save(consumerIntent)
    })
  })
}

const assign = require('lodash/fp/assign')
const Cid = require('cuid')
const { pull } = require('catstack')

module.exports = {
  needs: ['consumerIntents.action.set', 'first'],
  create: (api) => ({
    run: (model, consumerIntent) => {
      if (!consumerIntent.id) {
        consumerIntent = assign(consumerIntent, {
          id: Cid()
        })
      }

      return pull.values([
        api.consumerIntents.action.set(consumerIntent)
      ])
    }
  })
}

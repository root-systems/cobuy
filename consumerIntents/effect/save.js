const assign = require('lodash/fp/assign')
const Cid = require('cuid')

module.exports = {
  needs: {
    'pull.values': 'first',
    'consumerIntents.action.set': 'first'
  },
  create: (api) => ({
    run: (model, consumerIntent) => {
      if (!consumerIntent.id) {
        consumerIntent = assign(consumerIntent, {
          id: Cid()
        })
      }

      return api.pull.values([
        api.consumerIntents.action.set(consumerIntent)
      ])
    }
  })
}

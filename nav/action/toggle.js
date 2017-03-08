const assign = require('lodash/fp/assign')

module.exports = {
  create: () => ({
    update: (model) => ({
      model: assign(model, {
        isExpanded: !model.isExpanded
      })
    })
  })
}

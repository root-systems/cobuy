const map = require('lodash/fp/map')

module.exports = {
  needs: {
    'html.create': 'first'
  },
  create: (api) => {
    const mapCostSteps = map(renderCostStep)

    return renderCost

    function renderCost (cost) {
      return api.html.create`
        <ul>
          ${mapCostSteps(cost)}
        </ul>
      `
    }

    function renderCostStep (costStep) {
      return api.html.create`
        <li>
          ${costStep.pricePerBatch}
          ${costStep.currency}
          ${'@ >'}
          ${costStep.minBatches} batches
        </li>
      `
    }
  }
}

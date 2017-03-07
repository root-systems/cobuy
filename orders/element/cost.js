const map = require('lodash/fp/map')

module.exports = {
  needs: {
    'html.hx': 'first'
  },
  create: (api) => {
    const mapCostSteps = map(renderCostStep)

    return renderCost

    function renderCost (cost) {
      return api.html.hx`
        <ul>
          ${mapCostSteps(cost)}
        </ul>
      `
    }

    function renderCostStep (costStep) {
      return api.html.hx`
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

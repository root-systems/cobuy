const map = require('lodash/fp/map')

module.exports = {
  create: (api) => {
    const { Element } = api.css

    const stepListStyles = () => ({})
    const StepList = Element('ul', stepListStyles)

    const stepItemStyles = () => ({})
    const StepItem = Element('li', stepItemStyles)

    const mapCostSteps = map(renderCostStep)

    return renderCost

    function renderCost (cost) {
      return StepList(mapCostSteps(cost))
    }

    function renderCostStep (costStep) {
      return StepItem([
        costStep.pricePerBatch,
        costStep.currency,
        '@ >',
        costStep.minBatches,
        'batches'
      ])
    }
  }
}

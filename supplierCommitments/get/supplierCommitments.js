const assign = require('lodash/fp/assign')
const flow = require('lodash/fp/flow')
const map = require('lodash/fp/map')
const get = require('lodash/fp/get')
const find = require('lodash/fp/find')
const mapValues = require('lodash/fp/mapValues')
const mapValuesWithKey = mapValues.convert({ cap: false })
const isUndefined = require('lodash/fp/isUndefined')
const BigMath = require('bigmath')
const pluralize = require('plur')

module.exports = {
  needs: {
    'supplierCommitments.get.rawSupplierCommitments': 'first'
  },
  create: (api) => [
    api.supplierCommitments.get.rawSupplierCommitments,
    mapValuesWithKey(getSupplierCommitment)
  ]
}

function getSupplierCommitment (supplierCommitment, supplierCommitmentId) {
  return assign(supplierCommitment, {
    id: supplierCommitmentId,
    costFunction: getCostFunction(supplierCommitment),
    minimumBatches: getMinimumBatches(supplierCommitment),
    pluralName: pluralize(supplierCommitment.name)
  })
}

const getMinimumBatches = flow(
  get('costSteps'),
  map('minimumBatches'),
  BigMath.min
)

function getCostFunction ({ batchSize, costSteps }) {
  const findCostStep = numBatches => find(costStep => {
    return BigMath.greaterThanOrEqualTo(numBatches, costStep.minimumBatches)
  })

  return function ({ value, currency }) {
    const numBatches = BigMath.floor(BigMath.div(value, batchSize.value))
    const costStep = findCostStep(numBatches)(costSteps)
    if (isUndefined(costStep)) return null
    const pricePerUnit = BigMath.div(costStep.pricePerBatch, batchSize.value)
    return BigMath.mul(value, pricePerUnit)
  }
}

const assign = require('lodash/fp/assign')
const mapValues = require('lodash/fp/mapValues')
const mapValuesWithKey = mapValues.convert({ cap: false })

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
    id: supplierCommitmentId
  })
}

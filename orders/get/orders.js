const map = require('lodash/fp/map')
const assign = require('lodash/fp/assign')
const mapValues = require('lodash/fp/mapValues')
const mapValuesWithKey = mapValues.convert({ cap: false })

module.exports = {
  needs: {
    'orders.get.rawOrders': 'first',
    'supplierCommitments.get.supplierCommitments': 'first',
    'consumerIntents.get.consumerIntentsByOrder': 'first'
  },
  create: (api) => [
    api.orders.get.rawOrders,
    api.supplierCommitments.get.supplierCommitments,
    api.consumerIntents.get.consumerIntentsByOrder,
    (orders, supplierCommitments, consumerIntentsByOrder) => {
      const getSupplierCommitmentsFromIds = map(id => {
        return supplierCommitments[id]
      })

      const getOrders = mapValuesWithKey(getOrder)

      return getOrders(orders)

      function getOrder (order, orderId) {
        const { supplierCommitmentIds } = order
        return assign(order, {
          id: orderId,
          supplierCommitments: getSupplierCommitmentsFromIds(supplierCommitmentIds),
          consumerIntents: consumerIntentsByOrder[orderId]
        })
      }
    }
  ]
}

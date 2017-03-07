const map = require('lodash/fp/map')
const assign = require('lodash/fp/assign')
const sumBy = require('lodash/fp/sumBy')
const mapValues = require('lodash/fp/mapValues')
const mapValuesWithKey = mapValues.convert({ cap: false })
const filter = require('lodash/fp/filter')

module.exports = {
  needs: {
    'auth.get.whoami': 'first',
    'orders.get.rawOrders': 'first',
    'supplierCommitments.get.supplierCommitments': 'first',
    'consumerIntents.get.consumerIntentsByOrder': 'first'
  },
  create: (api) => [
    api.orders.get.rawOrders,
    api.auth.get.whoami,
    api.supplierCommitments.get.supplierCommitments,
    api.consumerIntents.get.consumerIntentsByOrder,
    (orders, whoami, supplierCommitments, consumerIntentsByOrder) => {
      const getSupplierCommitmentsFromIds = map(id => {
        return supplierCommitments[id]
      })

      const getOrders = mapValuesWithKey(getOrder)
      const filterToMe = filter(o => o.agentId === whoami)
      const filterToSupplierCommitment = id => filter(o => o.supplierCommitmentId === id)

      return getOrders(orders)

      function getOrder (order, orderId) {
        const { supplierCommitmentIds } = order

        const supplierCommitments = getSupplierCommitmentsFromIds(supplierCommitmentIds)
        const allConsumerIntents = consumerIntentsByOrder[orderId]
        const myConsumerIntents = filterToMe(consumerIntentsByOrder[orderId])

        return assign(order, {
          id: orderId,
          supplierCommitments,
          allConsumerIntents,
          myConsumerIntents
        })
      }
    }
  ]
}

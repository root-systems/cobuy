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

        const orderItems = supplierCommitments.map(supplierCommitment => {
          const orderItemAllConsumerIntents = filterToSupplierCommitment(supplierCommitment.id)(allConsumerIntents)
          const orderItemMyConsumerIntent = filterToSupplierCommitment(supplierCommitment.id)(myConsumerIntents)[0] || {
            agentId: whoami,
            supplierCommitmentId: supplierCommitment.id,
            orderId,
            minValue: 0,
            maxValue: 0
          }
          const { batchSize } = supplierCommitment

          const totalMinValue = sumMinValue(orderItemAllConsumerIntents)
          const totalMaxValue = sumMaxValue(orderItemAllConsumerIntents)
          const totalMinBatches = Math.floor(totalMinValue / batchSize.value)
          const totalMinRemainder = totalMinValue % batchSize.value
          const totalExtraValue = totalMaxValue - totalMinValue
          const didFillExtra = (totalMinRemainder + totalExtraValue) >= batchSize.value
          const totalBatches = totalMinBatches + (didFillExtra ? 1 : 0)

          const nextMin = didFillExtra ? 0 : totalMinRemainder
          const nextExtra = didFillExtra ? 0 : totalExtraValue
          const nextLeft = batchSize.value - nextExtra - nextMin

          return {
            supplierCommitment,
            allConsumerIntents: orderItemAllConsumerIntents,
            myConsumerIntent: orderItemMyConsumerIntent,
            totalMinValue,
            totalMaxValue,
            totalBatches,
            nextMin,
            nextExtra,
            nextLeft
          }
        })

        return assign(order, {
          id: orderId,
          orderItems,
          supplierCommitments,
          allConsumerIntents,
          myConsumerIntents
        })
      }
    }
  ]
}

const sumMinValue = sumBy('minValue')
const sumMaxValue = sumBy('maxValue')

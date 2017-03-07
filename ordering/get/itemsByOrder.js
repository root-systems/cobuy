const map = require('lodash/fp/map')
const assign = require('lodash/fp/assign')
const sumBy = require('lodash/fp/sumBy')
const mapValues = require('lodash/fp/mapValues')
const mapValuesWithKey = mapValues.convert({ cap: false })
const filter = require('lodash/fp/filter')

module.exports = {
  needs: {
    'ordering.get.rawOrderingItems': 'first',
    'auth.get.whoami': 'first',
    'orders.get.orders': 'first',
    'supplierCommitments.get.supplierCommitments': 'first'
  },
  create: (api) => [
    api.ordering.get.rawOrderingItems,
    api.orders.get.orders,
    api.auth.get.whoami,
    (orderingItems, orders, whoami) => {
      const getItemsByOrders = mapValues(getItemsByOrder)
      const filterToSupplierCommitment = id => filter(o => o.supplierCommitmentId === id)

      return getItemsByOrders(orders)

      function getItemsByOrder (order) {
        const { supplierCommitments } = order
        const getItems = mapValues(supplierCommitment => {
          return getItem({ order, supplierCommitment })
        })

        return getItems(supplierCommitments)
      }

      function getItem ({ order, supplierCommitment }) {
        const { id: orderId } = order
        const orderingItemId = OrderingItemId({ order, supplierCommitment })
        const rawOrderingItem = orderingItems[orderingItemId]

        const allConsumerIntents = filterToSupplierCommitment(supplierCommitment.id)(order.allConsumerIntents)
        const myConsumerIntent = filterToSupplierCommitment(supplierCommitment.id)(order.myConsumerIntents)[0] || {
          agentId: whoami,
          supplierCommitmentId: supplierCommitment.id,
          orderId,
          minValue: 0,
          maxValue: 0
        }
        const { batchSize } = supplierCommitment

        const totalMinValue = sumMinValue(allConsumerIntents)
        const totalMaxValue = sumMaxValue(allConsumerIntents)
        const totalMinBatches = Math.floor(totalMinValue / batchSize.value)
        const totalMinRemainder = totalMinValue % batchSize.value
        const totalExtraValue = totalMaxValue - totalMinValue
        const didFillExtra = (totalMinRemainder + totalExtraValue) >= batchSize.value
        const totalBatches = totalMinBatches + (didFillExtra ? 1 : 0)

        const nextMin = didFillExtra ? 0 : totalMinRemainder
        const nextExtra = didFillExtra ? 0 : totalExtraValue
        const nextLeft = batchSize.value - nextExtra - nextMin

        return assign(rawOrderingItem, {
          id: orderingItemId,
          supplierCommitment,
          allConsumerIntents,
          myConsumerIntent,
          totalMinValue,
          totalMaxValue,
          totalBatches,
          nextMin,
          nextExtra,
          nextLeft
        })
      }
    }
  ]
}

const sumMinValue = sumBy('minValue')
const sumMaxValue = sumBy('maxValue')

function OrderingItemId ({ order, supplierCommitment }) {
  return `${order.id}_${supplierCommitment.id}`
}

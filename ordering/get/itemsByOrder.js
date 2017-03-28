const map = require('lodash/fp/map')
const assign = require('lodash/fp/assign')
const assignAll = require('lodash/fp/assignAll')
const mapValues = require('lodash/fp/mapValues')
const mapValuesWithKey = mapValues.convert({ cap: false })
const filter = require('lodash/fp/filter')
const flow = require('lodash/fp/flow')
const reduce = require('lodash/fp/reduce')
const sortBy = require('lodash/fp/sortBy')
const reverse = require('lodash/fp/reverse')
const keyBy = require('lodash/fp/keyBy')
const BigMath = require('bigmath')

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
        const getItems = flow(
          map(supplierCommitment => {
            return getItem({ order, supplierCommitment })
          }),
          sortBy('totalMinValue'),
          reverse,
          keyBy('id')
        )

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
          minValue: '0',
          maxValue: '0'
        }
        const { currency } = order
        const { name, pluralName, batchSize, minBatches } = supplierCommitment

        const totalMinValue = sumMinValue(allConsumerIntents)
        const totalMaxValue = sumMaxValue(allConsumerIntents)
        const totalMinBatches = BigMath.floor(BigMath.div(totalMinValue, batchSize.value))
        const totalMinRemainder = BigMath.mod(totalMinValue, batchSize.value)
        const totalExtraValue = BigMath.sub(totalMaxValue, totalMinValue)
        const didFillExtra = BigMath.greaterThanOrEqualTo(BigMath.add(totalMinRemainder, totalExtraValue), batchSize.value)
        const totalBatches = BigMath.add(totalMinBatches, (didFillExtra ? '1' : '0'))

        const nextMin = didFillExtra ? '0' : totalMinRemainder
        const nextExtra = didFillExtra ? '0' : totalExtraValue
        const nextLeft = BigMath.sub(BigMath.sub(batchSize.value, nextExtra), nextMin)

        // TODO implement for real
        const expectedValue = BigMath.greaterThanOrEqualTo(totalBatches, '1')
          ? BigMath.floor(BigMath.add(myConsumerIntent.minValue, BigMath.div(BigMath.sub(myConsumerIntent.maxValue, myConsumerIntent.minValue), 2)))
          : '0'
        const expectedCost = supplierCommitment.costFunction({ value: totalMinValue, currency }) || '0'

        const shouldMeetMinBatches = BigMath.lessThan(totalBatches, minBatches)
        const shouldFillExtraBatch = !(didFillExtra || BigMath.equals(nextMin, '0'))

        return assignAll([
          {
            isExpanded: false
          },
          rawOrderingItem,
          {
            id: orderingItemId,
            supplierCommitment,
            name,
            pluralName,
            batchSize,
            minBatches,
            allConsumerIntents,
            myConsumerIntent,
            expectedValue,
            expectedCost,
            currency,
            totalMinValue,
            totalMaxValue,
            totalBatches,
            didFillExtra,
            nextMin,
            nextExtra,
            nextLeft,
            shouldMeetMinBatches,
            shouldFillExtraBatch
          }
        ])
      }
    }
  ]
}

const sumMinValue = sumBy('minValue')
const sumMaxValue = sumBy('maxValue')

function OrderingItemId ({ order, supplierCommitment }) {
  return `${order.id}_${supplierCommitment.id}`
}

function sumBy (name) {
  return flow(
    map(name),
    reduce(BigMath.add, '0')
  )
}

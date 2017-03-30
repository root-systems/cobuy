const map = require('lodash/fp/map')
const assign = require('lodash/fp/assign')
const assignAll = require('lodash/fp/assignAll')
const mapValues = require('lodash/fp/mapValues')
const filter = require('lodash/fp/filter')
const flow = require('lodash/fp/flow')
const reduce = require('lodash/fp/reduce')
const sortBy = require('lodash/fp/sortBy')
const reverse = require('lodash/fp/reverse')
const keyBy = require('lodash/fp/keyBy')
const BigMath = require('bigmath')

module.exports = {
  needs: {
    ordering: {
      'get.rawOrderingItems': 'first',
      util: {
        totalsForItem: 'first',
        expectedsForItem: 'first'
      }
    },
    'app.util.sumBy': 'first',
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
      const sumByValue = api.app.util.sumBy('value')

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
          desiredValue: '0',
          minimumValue: '0',
          maximumValue: '0'
        }
        const { currency } = order
        const { name, pluralName, batchSize, minimumBatches } = supplierCommitment

        const totals = api.ordering.util.totalsForItem({ allConsumerIntents, batchSize })

        const didMeetMinimumBatches = BigMath.greaterThanOrEqualTo(totals.minimumBatchs, minimumBatches)

        const expectedConsumerCommitments = api.ordering.util.expectedsForItem({ allConsumerIntents, batchSize, didMeetMinimumBatches, totals })

        const expectedGroupValue = sumByValue(expectedConsumerCommitments)
        const expectedMyValue = expectedConsumerCommitments.length > 0
          ? expectedConsumerCommitments.find(cc => cc.agentId === whoami).value
          : '0'

        const expectedGroupCost = supplierCommitment.costFunction({ value: expectedGroupValue, currency }) || '0'
        const expectedMyCost = expectedGroupCost === '0' ? '0' : BigMath.mul(expectedGroupCost, BigMath.div(expectedMyValue, expectedGroupValue))

        const didMeetIntentRanges = reduce((sofar, nextExpected) => {
          if (sofar === false) return sofar
          const consumerIntent = allConsumerIntents.find(ci => ci.id === nextExpected.consumerIntentId)
          return sofar && (
            BigMath.greaterThanOrEqualTo(consumerIntent.minimumValue, nextExpected.value)
            && BigMath.lessThanOrEqualTo(nextExpected.value, consumerIntent.maximumValue)
          )
        }, true)

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
            currency,
            minimumBatches,
            allConsumerIntents,
            myConsumerIntent,
            totals,
            expectedGroupValue,
            expectedMyValue,
            expectedGroupCost,
            expectedMyCost,
            didMeetMinimumBatches,
            didMeetIntentRanges
          }
        ])
      }
    }
  ]
}

function OrderingItemId ({ order, supplierCommitment }) {
  return `${order.id}_${supplierCommitment.id}`
}

const map = require('lodash/fp/map')
const mapValues = require('lodash/fp/mapValues')
const keyBy = require('lodash/fp/keyBy')
const some = require('lodash/fp/some')
const flow = require('lodash/fp/flow')
const BigMath = require('bigmath')

module.exports = {
  needs: ['app.util.sumBy', 'first'],
  create: (api) => {
    const getZeroCommitments = map(({ id: consumerIntentId, agentId, orderId }) => ({
      consumerIntentId,
      agentId,
      orderId,
      value: '0'
    }))
    const getInitialCommitments = map(({ id: consumerIntentId, agentId, orderId, desiredValue }) => ({
      consumerIntentId,
      agentId,
      orderId,
      value: desiredValue
    }))
    const getConstraints = flow(
      keyBy('id'),
      mapValues(({ minimumValue, maximumValue }) => {
        return (value) => BigMath.greaterThanOrEqualTo(value, minimumValue) && BigMath.lessThanOrEqualTo(value, maximumValue)
      })
    )
    const sumByValue = api.app.util.sumBy('value')

    return (options) => {
      const {
        minimumBatchs,
        batchSize,
        totals,
        allConsumerIntents
      } = options

      // if it's not possible to meet the minimum order batches with maximum intents, then early return with all zero
      const possibleToMeetMinimumBatchs = BigMath.greaterThanOrEqualTo(totals.maximumBatchs, minimumBatchs)
      if (!possibleToMeetMinimumBatchs || allConsumerIntents.length === 0) {
        return getZeroCommitments(allConsumerIntents)
      }

      // if it's not possible to meet the minimum order batches with desired intents,
        // run one round of the solver going up
      // else
        // find closest batch value to total desired value, respecting min and max constaints
        // run first round of the solver towards closest batch value, respecting min and max constraints
        // if done return
        // run second round of the solver towards next closest batch value, respecting min and max constraints
        // if done return
        // run third round of the solver towards closest batch value, go wild without constraints

      // find closest batch value to total desired value
      const nextMoreBatchValue = BigMath.mul(BigMath.add(totals.desiredBatchs, '1'), batchSize.value)
      const nextLessBatchValue = BigMath.mul(totals.desiredBatchs, batchSize.value)
      const distanceToNextMoreBatch = BigMath.sub(nextMoreBatchValue, totals.desiredValue)
      const distanceToNextLessBatch = BigMath.sub(totals.desiredValue, nextLessBatchValue)
      const distanceToNextBatch = BigMath.min(distanceToNextMoreBatch, distanceToNextLessBatch)

      // TODO: should we break this tie based on whether there is more distance to minimum or maximum?
      const isNextBatchMore = BigMath.eq(distanceToNextBatch, distanceToNextMoreBatch)
      var directionToNextBatch = isNextBatchMore ? '1' : '-1'
      var expectedGroupValue = isNextBatchMore ? nextMoreBatchValue : nextLessBatchValue

      const constraints = getConstraints(allConsumerIntents)

      const sumToTotalExpected = (expecteds) => sumByValue(expecteds) === expectedGroupValue
      const changeByOne = (value) => BigMath.add(value, directionToNextBatch)
      const canChangeExpected = ({ consumerIntentId, value }) => constraints[consumerIntentId](changeByOne(value))
      const someCanChange = some(canChangeExpected)

      // get inital expecteds based on desired value
      // TODO order initial data by _most recently confirmed_ first
      var firstExpecteds = getInitialCommitments(allConsumerIntents)
      var expecteds = firstExpecteds
      var nextIndex = 0
      const getNextIndex = () => {
        const currentIndex = nextIndex
        nextIndex = (nextIndex + 1) % expecteds.length
        return currentIndex
      }

      // first pass, in first direction and preserving max and min

      // while the sum of the expected values isn't the batch _and_ some expecteds have room to change
      while (!sumToTotalExpected(expecteds) && someCanChange(expecteds)) {
        const next = expecteds[getNextIndex()]
        // if possible to change given minimum and maximum
        if (canChangeExpected(next)) {
          next.value = changeByOne(next.value)
        }
      }

      if (sumToTotalExpected(expecteds)) return expecteds

      // second pass, try other direction, preserving max and min
      var secondExpecteds = getInitialCommitments(allConsumerIntents)
      expecteds = secondExpecteds
      directionToNextBatch = BigMath.mul(directionToNextBatch, '-1')
      expectedGroupValue = isNextBatchMore ? nextLessBatchValue : nextMoreBatchValue
      nextIndex = 0

      // while the sum of the expected values isn't the batch _and_ some expecteds have room to change
      while (!sumToTotalExpected(expecteds) && someCanChange(expecteds)) {
        const next = expecteds[getNextIndex()]
        // if possible to change given minimum and maximum
        if (canChangeExpected(next)) {
          next.value = changeByOne(next.value)
        }
      }

      if (sumToTotalExpected(expecteds)) return expecteds

      // third pass, continue first direction, go wild
      expecteds = firstExpecteds
      directionToNextBatch = BigMath.mul(directionToNextBatch, '-1')
      expectedGroupValue = isNextBatchMore ? nextMoreBatchValue : nextLessBatchValue
      nextIndex = 0

      // while the sum of the expected values isn't the batch
      // this does not preserve minimum and maximum!
      while (!sumToTotalExpected(expecteds)) {
        const next = expecteds[getNextIndex()]
        next.value = changeByOne(next.value)
      }

      // QUESTIONS
      // - should we restart the index when the min / max break
      // - should we restart the entire calculation when the min / max break
      //   - otherwise those with big diff from min to desired will have bigger diff from expected to desired
      //

      return expecteds
    }
  }
}

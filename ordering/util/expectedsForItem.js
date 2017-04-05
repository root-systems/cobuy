const clone = require('lodash/fp/clone')
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
    const getInitialValues = map(({ id, desiredValue }) => ({
      id,
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

      const valuesToCommitments = map(({ value, id }) => {
        const { agentId, orderId } = allConsumerIntents.find(ci => ci.id === id)
        return {
          consumerIntentId: id,
          agentId,
          orderId,
          value
        }
      })

      // if it's not possible to meet the minimum order batches with maximum intents,
      const possibleToMeetMinimumBatchsWithMaximumIntents = BigMath.greaterThanOrEqualTo(totals.maximumBatchs, minimumBatchs)
      if (!possibleToMeetMinimumBatchsWithMaximumIntents || allConsumerIntents.length === 0) {
        // then early return with all zero
        return getZeroCommitments(allConsumerIntents)
      }

      // find closest batch value to total desired value
      const nextMoreBatchValue = BigMath.mul(BigMath.add(totals.desiredBatchs, '1'), batchSize.value)
      const nextLessBatchValue = BigMath.mul(totals.desiredBatchs, batchSize.value)
      const distanceToNextMoreBatch = BigMath.sub(nextMoreBatchValue, totals.desiredValue)
      const distanceToNextLessBatch = BigMath.sub(totals.desiredValue, nextLessBatchValue)
      const distanceToNextBatch = BigMath.min(distanceToNextMoreBatch, distanceToNextLessBatch)

      // TODO: should we break this tie based on whether there is more distance to minimum or maximum?
      const isNextBatchMore = BigMath.eq(distanceToNextBatch, distanceToNextMoreBatch)
      const directionToNextBatch = isNextBatchMore ? '1' : '-1'
      const closestGroupValue = isNextBatchMore ? nextMoreBatchValue : nextLessBatchValue
      const nextClosestGroupValue = isNextBatchMore ? nextLessBatchValue : nextMoreBatchValue

      const constraints = getConstraints(allConsumerIntents)
      const initialValues = getInitialValues(allConsumerIntents)

      var result
      // if it's not possible to meet the minimum order batches with desired intents,
      const possibleToMeetMinimumBatchsWithDesiredIntents = BigMath.greaterThanOrEqualTo(totals.desiredBatchs, minimumBatchs)
      if (!possibleToMeetMinimumBatchsWithDesiredIntents) {
        // run one round of the solver going up
        result = satisfyConstraints({
          desiredTotal: closestGroupValue,
          direction: directionToNextBatch,
          initialValues,
          constraints
        })
        // if done return
        if (result.isSatisfied) return valuesToCommitments(result.values)
      }
      // else
      // find closest batch value to total desired value, respecting min and max constaints
      // run first round of the solver towards closest batch value, respecting min and max constraints
      result = satisfyConstraints({
        desiredTotal: closestGroupValue,
        direction: directionToNextBatch,
        initialValues,
        constraints
      })
      // if done return
      if (result.isSatisfied) return valuesToCommitments(result.values)
      const firstRoundValues = result.values

      // run second round of the solver towards next closest batch value, respecting min and max constraints
      result = satisfyConstraints({
        desiredTotal: nextClosestGroupValue,
        direction: BigMath.mul(directionToNextBatch, '-1'),
        initialValues,
        constraints
      })
      // if done return
      if (result.isSatisfied) return valuesToCommitments(result.values)

      // run third round of the solver towards closest batch value, go wild without constraints
      result = satisfyConstraints({
        desiredTotal: closestGroupValue,
        direction: directionToNextBatch,
        initialValues: firstRoundValues
      })
      // if done return
      if (result.isSatisfied) return valuesToCommitments(result.values)
    }

    function satisfyConstraints (options) {
      const {
        desiredTotal,
        direction,
        initialValues,
        constraints
      } = options

      var currentValues = map(clone, initialValues)

      const sumToTotal = (currentValues) => sumByValue(currentValues) === desiredTotal
      const changeByOne = (value) => BigMath.add(value, direction)
      const canChangeValue = ({ id, value }) => {
        if (!constraints) return true
        else return constraints[id](changeByOne(value))
      }
      const someCanChange = some(canChangeValue)

      var nextIndex = 0
      const getNextIndex = () => {
        const currentIndex = nextIndex
        nextIndex = (nextIndex + 1) % currentValues.length
        return currentIndex
      }

      // while the sum of the expected values isn't the desired _and_ some values have room to change
      while (!sumToTotal(currentValues) && someCanChange(currentValues)) {
        const next = currentValues[getNextIndex()]
        // if possible to change given constraints
        if (canChangeValue(next)) {
          next.value = changeByOne(next.value)
        }
      }

      return {
        values: currentValues,
        isSatisfied: sumToTotal(currentValues)
      }

      // QUESTIONS
      // - should we restart the index when the min / max break
      // - should we restart the entire calculation when the min / max break
      //   - otherwise those with big diff from min to desired will have bigger diff from expected to desired
      //
    }
  }
}

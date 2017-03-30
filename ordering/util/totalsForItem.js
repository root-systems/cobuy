const BigMath = require('bigmath')

module.exports = {
  needs: {
    'app.util.sumBy': 'first'
  },
  create: (api) => {
    const { sumBy } = api.app.util

    const sumDesiredValue = sumBy('desiredValue')
    const sumMinimumValue = sumBy('minimumValue')
    const sumMaximumValue = sumBy('maximumValue')

    return (options) => {
      const {
        batchSize,
        allConsumerIntents
      } = options

      const desiredValue = sumDesiredValue(allConsumerIntents)
      const minimumValue = sumMinimumValue(allConsumerIntents)
      const maximumValue = sumMaximumValue(allConsumerIntents)

      const desiredBatchs = BigMath.floor(BigMath.div(desiredValue, batchSize.value))
      const minimumBatchs = BigMath.floor(BigMath.div(minimumValue, batchSize.value))
      const maximumBatchs = BigMath.floor(BigMath.div(maximumValue, batchSize.value))

      return {
        desiredValue,
        minimumValue,
        maximumValue,
        desiredBatchs,
        minimumBatchs,
        maximumBatchs
      }
    }
  }
}

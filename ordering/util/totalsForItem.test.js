const sumBy = require('../../app/util/sumBy').create()
const totalsForItem = require('./totalsForItem').create({
  app: { util: { sumBy } }
})

exports['easy'] = (assert, cb) => {
  const allConsumerIntents = [{
    desiredValue: '2',
    minimumValue: '0',
    maximumValue: '4'
  }, {
    desiredValue: '1',
    minimumValue: '0',
    maximumValue: '2'
  }, {
    desiredValue: '4',
    minimumValue: '3',
    maximumValue: '5'
  }, {
    desiredValue: '2',
    minimumValue: '2',
    maximumValue: '2'
  }]
  const batchSize = {
    value: '5'
  }
  const expected = {
    desiredValue: '9',
    minimumValue: '5',
    maximumValue: '13',
    desiredBatchs: '1',
    minimumBatchs: '1',
    maximumBatchs: '2'
  }
  const actual = totalsForItem({ allConsumerIntents, batchSize })
  assert.deepEqual(actual, expected)
  cb()
}

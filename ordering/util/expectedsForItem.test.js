const sumBy = require('../../app/util/sumBy').create()
const expectedsForItem = require('./expectedsForItem').create({
    app: { util: { sumBy } }
})

exports['1 person at 2x batch size'] = (assert, cb) => {
  const allConsumerIntents = [{
    id: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    desiredValue: '10',
    minimumValue: '5',
    maximumValue: '15'
  }]
  const batchSize = {
    value: '5'
  }
  const didMeetMinimumBatches = true
  const totals = {
    desiredValue: '10',
    desiredBatchs: '2'
  }
  const expected = [{
    agentId: 'agent1',
    orderId: 'order1',
    consumerIntentId: 'consumerIntent1',
    value: '10'
  }]
  const actual = expectedsForItem({ didMeetMinimumBatches, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
  cb()
}

exports['1 person at 2.2x batch size'] = (assert, cb) => {
  const allConsumerIntents = [{
    id: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    desiredValue: '11',
    minimumValue: '5',
    maximumValue: '15'
  }]
  const batchSize = {
    value: '5'
  }
  const didMeetMinimumBatches = true
  const totals = {
    desiredValue: '11',
    desiredBatchs: '2'
  }
  const expected = [{
    agentId: 'agent1',
    orderId: 'order1',
    consumerIntentId: 'consumerIntent1',
    value: '10'
  }]
  const actual = expectedsForItem({ didMeetMinimumBatches, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
  cb()
}

exports['1 person at 1.5x batch size'] = (assert, cb) => {
  const allConsumerIntents = [{
    id: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    desiredValue: '15',
    minimumValue: '10',
    maximumValue: '20'
  }]
  const batchSize = {
    value: '10'
  }
  const didMeetMinimumBatches = true
  const totals = {
    desiredValue: '15',
    desiredBatchs: '1'
  }
  const expected = [{
    agentId: 'agent1',
    orderId: 'order1',
    consumerIntentId: 'consumerIntent1',
    value: '20'
  }]
  const actual = expectedsForItem({ didMeetMinimumBatches, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
  cb()
}

exports['4 people, steps in correct order'] = (assert, cb) => {
  cb()
}

exports['4 people, 2 hit edge of min and max'] = (assert, cb) => {
  const allConsumerIntents = [{
    id: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    desiredValue: '11',
    minimumValue: '8',
    maximumValue: '14'
  }, {
    id: 'consumerIntent2',
    agentId: 'agent2',
    orderId: 'order1',
    desiredValue: '9',
    minimumValue: '7',
    maximumValue: '13'
  }, {
    id: 'consumerIntent3',
    agentId: 'agent3',
    orderId: 'order1',
    desiredValue: '11',
    minimumValue: '10',
    maximumValue: '12'
  }, {
    id: 'consumerIntent4',
    agentId: 'agent4',
    orderId: 'order1',
    desiredValue: '10',
    minimumValue: '9',
    maximumValue: '11'
  }]
  const batchSize = {
    value: '25'
  }
  const didMeetMinimumBatches = true
  const totals = {
    desiredValue: '41',
    desiredBatchs: '1'
  }
  const expected = [{
    consumerIntentId: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    value: '14'
  }, {
    consumerIntentId: 'consumerIntent2',
    agentId: 'agent2',
    orderId: 'order1',
    value: '13'
  }, {
    consumerIntentId: 'consumerIntent3',
    agentId: 'agent3',
    orderId: 'order1',
    value: '12'
  }, {
    consumerIntentId: 'consumerIntent4',
    agentId: 'agent4',
    orderId: 'order1',
    value: '11'
  }]
  const actual = expectedsForItem({ didMeetMinimumBatches, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
  cb()
}

exports['4 people, breaks min and max'] = (assert, cb) => {
  const allConsumerIntents = [{
    id: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    desiredValue: '8',
    minimumValue: '7',
    maximumValue: '11'
  }, {
    id: 'consumerIntent2',
    agentId: 'agent2',
    orderId: 'order1',
    desiredValue: '9',
    minimumValue: '8',
    maximumValue: '12'
  }, {
    id: 'consumerIntent3',
    agentId: 'agent3',
    orderId: 'order1',
    desiredValue: '11',
    minimumValue: '7',
    maximumValue: '12'
  }, {
    id: 'consumerIntent4',
    agentId: 'agent4',
    orderId: 'order1',
    desiredValue: '7',
    minimumValue: '6',
    maximumValue: '10'
  }]
  const batchSize = {
    value: '25'
  }
  const didMeetMinimumBatches = true
  const totals = {
    desiredValue: '35',
    desiredBatchs: '1'
  }
  const expected = [{
    consumerIntentId: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    value: '6'
  }, {
    consumerIntentId: 'consumerIntent2',
    agentId: 'agent2',
    orderId: 'order1',
    value: '7'
  }, {
    consumerIntentId: 'consumerIntent3',
    agentId: 'agent3',
    orderId: 'order1',
    value: '6'
  }, {
    consumerIntentId: 'consumerIntent4',
    agentId: 'agent4',
    orderId: 'order1',
    value: '6'
  }]
  const actual = expectedsForItem({ didMeetMinimumBatches, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
  cb()
}

exports['4 people, does other direction to satisfy min and max'] = (assert, cb) => {
  const allConsumerIntents = [{
    id: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    desiredValue: '8',
    minimumValue: '7',
    maximumValue: '14'
  }, {
    id: 'consumerIntent2',
    agentId: 'agent2',
    orderId: 'order1',
    desiredValue: '9',
    minimumValue: '8',
    maximumValue: '15'
  }, {
    id: 'consumerIntent3',
    agentId: 'agent3',
    orderId: 'order1',
    desiredValue: '11',
    minimumValue: '7',
    maximumValue: '14'
  }, {
    id: 'consumerIntent4',
    agentId: 'agent4',
    orderId: 'order1',
    desiredValue: '7',
    minimumValue: '6',
    maximumValue: '10'
  }]
  const batchSize = {
    value: '25'
  }
  const didMeetMinimumBatches = true
  const totals = {
    desiredValue: '35',
    desiredBatchs: '1'
  }
  const expected = [{
    consumerIntentId: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    value: '13'
  }, {
    consumerIntentId: 'consumerIntent2',
    agentId: 'agent2',
    orderId: 'order1',
    value: '13'
  }, {
    consumerIntentId: 'consumerIntent3',
    agentId: 'agent3',
    orderId: 'order1',
    value: '14'
  }, {
    consumerIntentId: 'consumerIntent4',
    agentId: 'agent4',
    orderId: 'order1',
    value: '10'
  }]
  const actual = expectedsForItem({ didMeetMinimumBatches, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
  cb()
}

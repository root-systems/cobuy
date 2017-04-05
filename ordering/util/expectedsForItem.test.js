const sumBy = require('../../app/util/sumBy').create()
const expectedsForItem = require('./expectedsForItem').create({
  app: { util: { sumBy } }
})
const totalsForItem = require('./totalsForItem').create({
  app: { util: { sumBy } }
})

exports['1 person at 2x batch size'] = (assert) => {
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
  const minimumBatchs = '1'
  const totals = totalsForItem({ allConsumerIntents, batchSize })
  const expected = [{
    agentId: 'agent1',
    orderId: 'order1',
    consumerIntentId: 'consumerIntent1',
    value: '10'
  }]
  const actual = expectedsForItem({ minimumBatchs, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
}

exports['1 person at 2.2x batch size'] = (assert) => {
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
  const minimumBatchs = '1'
  const totals = totalsForItem({ allConsumerIntents, batchSize })
  const expected = [{
    agentId: 'agent1',
    orderId: 'order1',
    consumerIntentId: 'consumerIntent1',
    value: '10'
  }]
  const actual = expectedsForItem({ minimumBatchs, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
}

exports['1 person at 1.5x batch size'] = (assert) => {
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
  const minimumBatchs = '1'
  const totals = totalsForItem({ allConsumerIntents, batchSize })
  const expected = [{
    agentId: 'agent1',
    orderId: 'order1',
    consumerIntentId: 'consumerIntent1',
    value: '20'
  }]
  const actual = expectedsForItem({ minimumBatchs, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
}

exports['4 people, steps in correct order'] = (assert) => {
}

exports['4 people, 2 hit edge of min and max'] = (assert) => {
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
  const minimumBatchs = '1'
  const totals = totalsForItem({ allConsumerIntents, batchSize })
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
  const actual = expectedsForItem({ minimumBatchs, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
}

exports['4 people, breaks min and max'] = (assert) => {
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
  const minimumBatchs = '1'
  const totals = totalsForItem({ allConsumerIntents, batchSize })
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
  const actual = expectedsForItem({ minimumBatchs, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
}

exports['4 people, does other direction to satisfy min and max'] = (assert) => {
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
  const minimumBatchs = '1'
  const totals = totalsForItem({ allConsumerIntents, batchSize })
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
  const actual = expectedsForItem({ minimumBatchs, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
}

exports['not possible to meet minimum quantity given total maximum value'] = (assert) => {
  const allConsumerIntents = [{
    id: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    desiredValue: '8',
    minimumValue: '7',
    maximumValue: '14'
  }]
  const batchSize = {
    value: '15'
  }
  const minimumBatchs = '1'
  const totals = totalsForItem({ allConsumerIntents, batchSize })
  const expected = [{
    consumerIntentId: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    value: '0'
  }]
  const actual = expectedsForItem({ minimumBatchs, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
}

exports['3 people, minimum batchs = 1'] = (assert) => {
  const allConsumerIntents = [{
    id: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    desiredValue: '4',
    minimumValue: '1',
    maximumValue: '8'
  }, {
    id: 'consumerIntent2',
    agentId: 'agent2',
    orderId: 'order1',
    desiredValue: '3',
    minimumValue: '1',
    maximumValue: '15'
  }, {
    id: 'consumerIntent3',
    agentId: 'agent3',
    orderId: 'order1',
    desiredValue: '4',
    minimumValue: '2',
    maximumValue: '6'
  }]
  const batchSize = {
    value: '25'
  }
  const minimumBatchs = '1'
  const totals = totalsForItem({ allConsumerIntents, batchSize })
  const expected = [{
    consumerIntentId: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    value: '8'
  }, {
    consumerIntentId: 'consumerIntent2',
    agentId: 'agent2',
    orderId: 'order1',
    value: '11'
  }, {
    consumerIntentId: 'consumerIntent3',
    agentId: 'agent3',
    orderId: 'order1',
    value: '16'
  }]
  const actual = expectedsForItem({ minimumBatchs, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
}

exports['4 people, minimum batchs > 1'] = (assert) => {
  const allConsumerIntents = [{
    id: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    desiredValue: '5',
    minimumValue: '2',
    maximumValue: '7'
  }, {
    id: 'consumerIntent2',
    agentId: 'agent2',
    orderId: 'order1',
    desiredValue: '9',
    minimumValue: '3',
    maximumValue: '15'
  }, {
    id: 'consumerIntent3',
    agentId: 'agent3',
    orderId: 'order1',
    desiredValue: '3',
    minimumValue: '1',
    maximumValue: '5'
  }, {
    id: 'consumerIntent4',
    agentId: 'agent4',
    orderId: 'order1',
    desiredValue: '6',
    minimumValue: '4',
    maximumValue: '9'
  }]
  const batchSize = {
    value: '4'
  }
  const minimumBatchs = '8'
  const totals = totalsForItem({ allConsumerIntents, batchSize })
  const expected = [{
    consumerIntentId: 'consumerIntent1',
    agentId: 'agent1',
    orderId: 'order1',
    value: '7'
  }, {
    consumerIntentId: 'consumerIntent2',
    agentId: 'agent2',
    orderId: 'order1',
    value: '12'
  }, {
    consumerIntentId: 'consumerIntent3',
    agentId: 'agent3',
    orderId: 'order1',
    value: '5'
  }, {
    consumerIntentId: 'consumerIntent4',
    agentId: 'agent4',
    orderId: 'order1',
    value: '9'
  }]
  const actual = expectedsForItem({ minimumBatchs, allConsumerIntents, batchSize, totals })
  assert.deepEqual(actual, expected)
}

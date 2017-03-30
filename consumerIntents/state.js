module.exports = {
  create: () => ({
    init: () => ({
      model: {
        consumerIntent1: {
          agentId: 'agent1',
          orderId: 'order1',
          supplierCommitmentId: 'supplierCommitment1',
          desiredValue: '2',
          minimumValue: '1',
          maximumValue: '3'
        }
      }
    })
  })
}

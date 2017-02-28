module.exports = {
  create: () => ({
    init: () => ({
      model: {
        consumerIntent1: {
          agentId: 'agent1',
          orderId: 'order1',
          supplierCommitmentId: 'supplierCommitment1',
          minValue: 1,
          maxValue: 3
        }
      }
    })
  })
}

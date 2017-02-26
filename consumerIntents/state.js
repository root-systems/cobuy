module.exports = {
  create: () => ({
    init: () => ({
      model: {
        agent1: {
          orderId: 'order1',
          supplierCommitmentId: 'supplierCommitment1',
          minValue: 1,
          maxValue: 3
        }
      }
    })
  })
}

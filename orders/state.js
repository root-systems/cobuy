module.exports = {
  create: () => ({
    init: () => ({
      model: {
        order1: {
          name: 'Root Systems buys veges!',
          supplierCommitmentIds: [
            'supplierCommitment1',
            'supplierCommitment2',
            'supplierCommitment3'
          ],
          date: Date.now()
        }
      }
    })
  })
}

module.exports = {
  create: () => ({
    init: () => ({
      model: {
        order1: {
          supplierCommitmentIds: [
            'supplierCommitment1',
            'supplierCommitment2',
            'supplierCommitment3',
          ]
        }
      }
    })
  })
}

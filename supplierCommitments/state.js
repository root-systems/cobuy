module.exports = {
  create: () => ({
    init: () => ({
      model: {
        supplierCommitment1: {
          id: 'supplierCommitment1',
          name: 'avocado',
          batchSize: {
            value: 5,
            unit: 'kg'
          },
          costFunction: [{
            minBatches: 2,
            pricePerBatch: 20,
            currency: 'NZD'
          }, {
            minBatches: 5,
            pricePerBatch: 15,
            currency: 'NZD'
          }]
        },
        supplierCommitment2: {
          id: 'supplierCommitment2',
          name: 'apple',
          batchSize: {
            value: 7,
            unit: 'kg'
          },
          costFunction: [{
            minBatches: 3,
            pricePerBatch: 10,
            currency: 'NZD'
          }, {
            minBatches: 10,
            pricePerBatch: 7,
            currency: 'NZD'
          }]
        },
        supplierCommitment3: {
          id: 'supplierCommitment3',
          name: 'plum',
          batchSize: {
            value: 3,
            unit: 'kg'
          },
          costFunction: [{
            minBatches: 4,
            pricePerBatch: 12,
            currency: 'NZD'
          }, {
            minBatches: 8,
            pricePerBatch: 10,
            currency: 'NZD'
          }]
        }
      }
    })
  })
}

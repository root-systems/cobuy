const addDays = require('date-fns/add_days')
const subDays = require('date-fns/sub_days')

module.exports = {
  create: () => ({
    init: () => ({
      model: {
        order1: {
          name: 'cat nip!',
          supplierCommitmentIds: [
            'supplierCommitment1',
            'supplierCommitment2',
            'supplierCommitment3'
          ],
          currency: 'NZD',
          startDate: subDays(new Date(), 10),
          endDate: subDays(new Date(), 5)
        },
        order2: {
          name: 'Root Systems buys veges!',
          supplierCommitmentIds: [
            'supplierCommitment1',
            'supplierCommitment2',
            'supplierCommitment3'
          ],
          currency: 'NZD',
          startDate: new Date(),
          endDate: addDays(new Date(), 10)
        },
        order3: {
          name: 'Ceres',
          supplierCommitmentIds: [
            'supplierCommitment1',
            'supplierCommitment2',
            'supplierCommitment3'
          ],
          currency: 'NZD',
          startDate: addDays(new Date(), 5),
          endDate: addDays(new Date(), 12)
        },
        order4: {
          name: 'Dry Goods',
          supplierCommitmentIds: [
            'supplierCommitment1',
            'supplierCommitment2',
            'supplierCommitment3'
          ],
          currency: 'NZD',
          startDate: addDays(new Date(), 15),
          endDate: addDays(new Date(), 20)
        }
      }
    })
  })
}

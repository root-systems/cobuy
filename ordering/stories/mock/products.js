// https://github.com/root-systems/cobuy/wiki/Models

export default [
  {
    id: 1,
    name: 'crayons',
    description: 'these are crayons. look at all the pretty colours! they are made of beeswax. you could probably eat them and not die.',
    image: 'http://www.mercurius-australia.com/site/images/1250623.jpg',
    priceSpecs: [
      {
        id: 1,
        productId: 1,
        minimum: '10',
        price: '9.99',
        currency: 'NZD'
      },
      {
        id: 2,
        productId: 1,
        minimum: '100',
        price: '7.99',
        currency: 'NZD'
      }
    ]
  },
  {
    id: 2,
    name: 'coloured pencils',
    description: 'these are pencils that are coloured',
    image: 'http://thewoodenwagon.com/Merchant2/graphics/00000001/ACST85090912-2.jpg',
    priceSpecs: [
      {
        id: 3,
        productId: 2,
        minimum: '10',
        price: '12.99',
        currency: 'NZD'
      },
      {
        id: 4,
        productId: 2,
        minimum: '100',
        price: '9.99',
        currency: 'NZD'
      }
    ]
  },
  {
    id: 3,
    name: 'workbooks',
    description: 'these are workbooks',
    image: 'http://jodihildebrandt.com/wp-content/uploads/2013/02/colored_workbooks1.jpg',
    priceSpecs: [
      {
        id: 5,
        productId: 3,
        minimum: '12',
        price: '1.99',
        currency: 'NZD'
      },
      {
        id: 6,
        productId: 3,
        minimum: '144',
        price: '1.29',
        currency: 'NZD'
      }
    ]
  }
]

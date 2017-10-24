// https://github.com/root-systems/cobuy/wiki/Models

export default [
  {
    id: 188,
    resourceTypeId: 123,
    resourceType: {
      id: 123,
      name: 'crayons',
      description: 'these are crayons. look at all the pretty colours! they are made of beeswax. you could probably eat them and not die.',
      image: 'http://www.mercurius-australia.com/site/images/1250623.jpg'
    },
    priceSpecs: [
      {
        id: 456,
        productId: 188,
        minimum: '10',
        price: '9.99',
        currency: 'NZD'
      },
      {
        id: 457,
        productId: 188,
        minimum: '100',
        price: '7.99',
        currency: 'NZD'
      }
    ],
    facets: [
      {
        id: 345,
        resourceTypeId: 123,
        name: 'colour',
        description: 'the colour of each crayon',
        values: [
          {
            id: 678,
            resourceTypeFacetId: 345,
            name: 'blue'
          },
          {
            id: 679,
            resourceTypeFacetId: 345,
            name: 'orange'
          },
          {
            id: 680,
            resourceTypeFacetId: 345,
            name: 'purple'
          }
        ]
      }
    ]
  },
  {
    id: 189,
    resourceTypeId: 124,
    resourceType: {
      id: 124,
      name: 'coloured pencils',
      description: 'these are pencils that are coloured',
      image: 'http://thewoodenwagon.com/Merchant2/graphics/00000001/ACST85090912-2.jpg'
    },
    priceSpecs: [
      {
        id: 233,
        productId: 189,
        minimum: '10',
        price: '12.99',
        currency: 'NZD'
      },
      {
        id: 234,
        productId: 189,
        minimum: '100',
        price: '9.99',
        currency: 'NZD'
      }
    ]
  },
  {
    id: 190,
    resourceTypeId: 125,
    resourceType: {
      id: 125,
      name: 'workbooks',
      description: 'these are workbooks',
      image: 'http://jodihildebrandt.com/wp-content/uploads/2013/02/colored_workbooks1.jpg'
    },
    priceSpecs: [
      {
        id: 235,
        productId: 190,
        minimum: '12',
        price: '1.99',
        currency: 'NZD'
      },
      {
        id: 236,
        productId: 190,
        minimum: '144',
        price: '1.29',
        currency: 'NZD'
      }
    ]
  }
]

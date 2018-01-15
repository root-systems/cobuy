import { createSelector } from 'reselect'
import { map, complement, either, isNil, isEmpty } from 'ramda'

import getOrderIntentsByOrderProductAgentPrice from './getOrderIntentsByOrderProductAgentPrice'

export default createSelector(
  getOrderIntentsByOrderProductAgentPrice,
  map( // by order
    map( // by product
      map( // by agent
        complement(either(isNil, isEmpty))
      )
    )
  )
)

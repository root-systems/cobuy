import { createSelector } from 'reselect'
import { uncurryN, mapObjIndexed } from 'ramda'

import getTokenState from './getTokensState'
import getConsumesByToken from './getConsumesByToken'

export default createSelector(
  getConsumesByToken,
  getTokenState,
  uncurryN(2, consumesByToken => mapObjIndexed((token, tokenId) => {
    const consumes = consumesByToken[tokenId]
    return merge(token, {
      consumes
    })
  }))
)

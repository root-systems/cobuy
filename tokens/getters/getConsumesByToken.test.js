import test from 'ava'

import { tokens, tokenConsumes, consumesByToken } from '../data/mock'
import getConsumesByToken from './getConsumesByToken'

test('getConsumesByToken', t => {
  const state = { tokens, tokenConsumes }
  const expected = consumesByToken
  const actual = getConsumesByToken(state)
  t.deepEqual(actual, expected)
})

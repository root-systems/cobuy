import test from 'ava'
import getPriceSpecs from './getPriceSpecs'

test('getPriceSpecs: priceSpecs exist on state', t => {
  const state = { priceSpecs: {} }

  t.deepEqual(getPriceSpecs(state), {})
})

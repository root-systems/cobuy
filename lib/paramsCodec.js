import { pipe, lensProp, over, ifElse, when, is, map } from 'ramda'

module.exports = {
  encode: encodeParams,
  decode: decodeParams
}

const encode = JSON.stringify
const encodeWhenObject = when(is(Object), encode)
const encodeArrayOrValue = propName => {
  const encodeProp = over(lensProp(propName), encodeWhenObject)
  return ifElse(is(Array), map(encodeProp), encodeProp)
}

const decode = JSON.parse
const decodeWhenString = when(is(String), decode)
const decodeArrayOrValue = propName => {
  const decodeProp = over(lensProp(propName), decodeWhenString)
  return ifElse(is(Array), map(decodeProp), decodeProp)
}


// TODO change to (propName) => (hook) => {}
function encodeParams (hook) {
  if (hook.data) {
    hook.data = encodeArrayOrValue('params')(hook.data)
  }
  return hook
}

function decodeParams (hook) {
  if (hook.result) {
    hook.result = decodeArrayOrValue('params')(hook.result)
  }
  return hook
}

import { isNil, any, pipe, prop, props } from 'ramda'

export default pipe(
  props(['adminAgent', 'consumerAgent', 'supplierAgent']),
  any(pipe(
    prop('profile'),
    isNil
  ))
)

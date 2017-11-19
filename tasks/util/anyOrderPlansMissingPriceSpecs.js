import { isNil, prop, any, pipe, values } from 'ramda'

export default pipe(
  values,
  any(
    any(pipe(
      prop('priceSpec'),
      isNil
    ))
  )
)

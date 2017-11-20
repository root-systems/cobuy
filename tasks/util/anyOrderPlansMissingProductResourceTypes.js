import { isNil, path, any, pipe, values } from 'ramda'

export default pipe(
  values,
  any(
    any(pipe(
      path(['product', 'resourceType']),
      isNil
    ))
  )
)

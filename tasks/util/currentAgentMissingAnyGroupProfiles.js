import { isNil, path, pipe, any, prop } from 'ramda'

export default pipe(
  prop('groups'),
  any(
    pipe(
      path(['agent', 'profile']),
      isNil
    )
  )
)

import { pipe, nthArg, either, path } from 'ramda'

export default pipe(
  nthArg(1),
  path(['match', 'params', 'profileId'])
)

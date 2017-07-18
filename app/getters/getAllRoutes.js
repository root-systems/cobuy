import { pipe, nthArg, propOr } from 'ramda'

const getAllRoutes = pipe(
  nthArg(1),
  propOr(null, 'routes')
)

export default getAllRoutes

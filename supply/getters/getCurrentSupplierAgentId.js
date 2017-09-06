import { pipe, nthArg, path } from 'ramda'

export default pipe(
  nthArg(1),
  path(['taskPlan', 'params', 'supplierAgentId'])
)

import { pipe, nthArg, path } from 'ramda'

// NOTE (mw):
// assumes current order is passed to component
// where this is being used as a getter
// as props.taskPlan.params.orderId

export default pipe(
  nthArg(1),
  path(['taskPlan', 'params', 'orderId'])
)

import { pipe, nthArg, either, path } from 'ramda'

// NOTE (mw):
// assumes current order is passed to component
// where this is being used as a getter
// as
//   props.taskPlan.params.orderId
// OR
//   props.match.params.orderId

export default pipe(
  nthArg(1),
  either(
    path(['taskPlan', 'params', 'orderId']),
    path(['match', 'params', 'orderId'])
  )
)

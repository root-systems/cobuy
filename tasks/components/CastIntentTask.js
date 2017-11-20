import h from 'react-hyperscript'
import { isNil, merge, pipe, mapObjIndexed, split, prop, propOr, nth, values, path, forEach, assoc, __, map } from 'ramda'
import { reduxForm as connectForm, Field } from 'redux-form'
import { compose } from 'recompose'

import renameBy from '../../lib/renameBy'
import ProductsForOrder from '../../ordering/components/ProductsForOrder'
import SingleViewProduct from '../../ordering/components/SingleViewProduct'

const forAgent = pipe(propOr({}), map)

// import styles from '../styles/CastIntentTask'

function CastIntentTask (props) {
  const { currentAgent, product } = props

  if(isNil(currentAgent)) {
    return null
  }

  if (product) {
    return h(SingleProduct, props)
  } else {
    return h(ManyProducts, props)
  }
}

const getInitialValues = pipe(
  map(prop('desiredQuantity')),
  renameBy(priceSpecId => `priceSpec-${priceSpecId}`),
  assoc('priceSpecs', __, {})
)

const getSubmittedPriceSpecs = pipe(
  prop('priceSpecs'),
  renameBy(pipe(
    split('-'),
    nth(1)
  ))
)

function SingleProduct (props) {
  const { actions, product, currentAgent, taskPlan, agents, orderIntentsByProductPriceAgent } = props
  const { id: taskPlanId } = taskPlan

  const onSubmit = pipe(
    getSubmittedPriceSpecs,
    mapObjIndexed((desiredQuantity, priceSpecId) => ({
      orderId: taskPlan.params.orderId,
      productId: product.id,
      agentId: currentAgent.id,
      priceSpecId,
      desiredQuantity
    })),
    values,
    forEach((submittedOrderIntent) => {
      const { orderIntentsByProductPriceAgent } = props
      const { productId, agentId, priceSpecId } = submittedOrderIntent
      const existingOrderIntent = path([productId, agentId, priceSpecId], orderIntentsByProductPriceAgent)
      if (existingOrderIntent) {
        actions.orderIntents.update(existingOrderIntent.id, submittedOrderIntent)
      } else {
        actions.orderIntents.create(submittedOrderIntent)
      }
    }),
    () => { actions.router.push(`/tasks/${taskPlanId}`) }
  )

  const orderIntentsByPriceAgent = orderIntentsByProductPriceAgent[product.id] || {}
  const initialValues = getInitialValues(forAgent(currentAgent.id)(orderIntentsByPriceAgent))

  const nextProps = merge(props, { onSubmit, agents, orderIntentsByPriceAgent, initialValues })

  // TODO pass onNavigate to allow SingleViewProduct
  // to navigate back to list product view
  return h(SingleViewProduct, nextProps)
}

function ManyProducts (props) {
  const { actions } =  props
  const onNavigate = (product) => {
    const { taskPlan } = props
    const { id: productId } = product
    const { id: taskPlanId } = taskPlan
    actions.router.push(`/tasks/${taskPlanId}?productId=${productId}`)
  }
  const nextProps = merge(props, { onNavigate })
  return h(ProductsForOrder, nextProps)
}

export default CastIntentTask

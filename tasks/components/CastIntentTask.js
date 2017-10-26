import h from 'react-hyperscript'
import { isNil, merge, pipe, mapObjIndexed, split, prop, nthArg, forEach } from 'ramda'
import { reduxForm as connectForm, Field } from 'redux-form'
import { compose } from 'recompose'

import renameBy from '../../lib/renameBy'
import ProductList from '../../ordering/components/ProductList'
import SingleViewProduct from '../../ordering/components/SingleViewProduct'


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

const getSubmittedPriceSpecs = pipe(
  prop('priceSpecs'),
  renameBy(pipe(
    split('-'),
    nthArg(1)
  ))
)

function SingleProduct (props) {
  const { actions, product, currentAgent, taskPlan, orderIntents } = props

  const onSubmit = pipe(
    getSubmittedPriceSpecs,
    mapObjIndexed((desiredQuantity, priceSpecId) => ({
      orderId: taskPlan.params.orderId,
      productId: product.id,
      agentId: currentAgent.id,
      priceSpecId,
      desiredQuantity
    })),
    forEach((submittedOrderIntent) => {
      const { ordersByProductAgentPrice } = props
      const { productId, agentId, priceSpecId } = submittedOrderIntent
      const existingOrderIntent = path([productId, agentId, priceSpecId], ordersByProductAgentPrice)
      if (existingOrderIntent) {
        actions.orderIntents.update(existingOrderIntent.id, submittedOrderIntent)
      } else {
        actions.orderIntents.create(submittedOrderIntent)
      }
    })
  )

  const nextProps = merge(props, { onSubmit })

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
  return h(ProductList, nextProps)
}

export default CastIntentTask

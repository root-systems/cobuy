import h from 'react-hyperscript'
import { isNil, merge, keys, takeLast, toString, mapObjIndexed, split, forEach, pick, find, equals, values } from 'ramda'
import { reduxForm as connectForm, Field } from 'redux-form'
import { compose } from 'recompose'

import ProductList from '../../ordering/components/ProductList'
import SingleViewProduct from '../../ordering/components/SingleViewProduct'


// import styles from '../styles/CastIntentTask'

function CastIntentTask (props) {
  const { actions, currentAgent, taskPlan, routerParams } = props
  if(isNil(currentAgent)) {
    return null
  }

  const { productId } = routerParams
  if (productId) {
    return h(SingleProduct, props)
  } else {
    return h(ManyProducts, props)
  }
}

function SingleProduct (props) {
  const { actions, products, routerParams, currentAgent, taskPlan, orderIntents } = props
  const product = products[routerParams.productId]
  const nextProps = merge(props, { product, onSubmit })
  // TODO pass onNavigate to allow SingleViewProduct
  // to navigate back to list product view
  return h(SingleViewProduct, nextProps)
  function onSubmit (value) {

    const submittedOrderIntents = values(mapObjIndexed((quantity, priceSpecString) => {
      return {
        agentId: currentAgent.id,
        desiredQuantity: parseInt(quantity),
        productId: product.id,
        priceSpecId: parseInt(split('-', priceSpecString)[1]),
        orderId: taskPlan.params.orderId
      }
    }, value.priceSpecs))

    forEach((submittedOrderIntent) => {
      const scopedSubmittedOrderIntent = pick(['orderId', 'priceSpecId', 'productId'], submittedOrderIntent)
      const existingOrderIntent = find((orderIntent) => {
        const scopedOrderIntent = pick(['orderId', 'priceSpecId', 'productId'], orderIntent)
        return equals(scopedOrderIntent, scopedSubmittedOrderIntent)
      }, values(orderIntents))
      console.log(orderIntents)
      if (existingOrderIntent) {
        actions.orderIntents.update(existingOrderIntent.id, submittedOrderIntent)
      } else {
        actions.orderIntents.create(submittedOrderIntent)
      }
    }, submittedOrderIntents)

  }
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

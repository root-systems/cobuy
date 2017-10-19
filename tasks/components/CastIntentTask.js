import h from 'react-hyperscript'
import { isNil, merge } from 'ramda'
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
  const { actions, products, routerParams } = props
  const product = products[routerParams.productId]
  const nextProps = merge(props, { product, onSubmit })
  // TODO pass onNavigate to allow SingleViewProduct
  // to navigate back to list product view
  return h(SingleViewProduct, nextProps)
  function onSubmit (value) {
    // value.pricesSpecs is an object where
    // keys are priceSpec-${priceSpecId}
    // and values are desired amounts.
    console.log('submitted!', value)
    // TODO create newIntent
    // TODO actions.intents.create(newIntent)
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

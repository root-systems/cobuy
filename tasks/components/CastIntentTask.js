import h from 'react-hyperscript'
import { isNil, merge } from 'ramda'
import { reduxForm as connectForm, Field } from 'redux-form'
import { compose } from 'recompose'

import ProductList from '../../ordering/components/ProductList'

// import styles from '../styles/CastIntentTask'

/*
const IntentForm = props => {
  const { handleSubmit, products, name } = props
  return (
    h('form', {
      onSubmit: () => { console.log('lunch') }
    }, [
      h(Field, {
        name: 'intent',
        component: ProductList,
        products: props.products
      })
    ])
  )
}

const CastIntentTask = compose(
  connectForm({ form: 'memberIntent' }),
  // connectStyles(styles)
)
*/

function CastIntentTask (props) {
  const { actions, currentAgent, taskPlan } = props

  if(isNil(currentAgent)) {
    return null
  }

  const handleNavigate = (product) => {
    const { id: productId } = product
    const { id: taskPlanId } = taskPlan
    actions.router.push(`/tasks/${taskPlanId}?productId=${productId}`)
  }
  const nextProps = merge(props, { handleNavigate })

  return h(ProductList, nextProps)
}

export default CastIntentTask

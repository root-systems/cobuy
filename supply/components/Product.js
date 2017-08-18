import h from 'react-hyperscript'
import { withState, compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm, FormSection, FieldArray } from 'redux-form'
import { pipe } from 'ramda'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/Product'
import ResourceType from '../../resources/components/ResourceType'

function Prices (props) {
  return h('div', 'prices')
}

const Product = compose(
  connectFela(styles),
)(props => {
  const { styles, product } = props
  const { resourceType, prices } = product
  return h('div', {
    className: styles.container
  }, [
    h(ResourceType, { resourceType }),
    h(Prices, { prices })
  ])
})

export default Product

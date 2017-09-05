import h from 'react-hyperscript'
import { withState, compose } from 'recompose'
import { connect as connectFela } from 'react-fela'
import { pipe } from 'ramda'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ProductListEditor'
import ProductEditor from '../../supply/components/ProductEditor'

const ProductListEditor = compose(
  connectFela(styles),
)(props => {
  const { styles } = props
  return h('div', {
    className: styles.container
  }, [
    h('button', {
      onClick: function(){
        debugger
      }
    }, 'create new product')
  ])
})

export default ProductListEditor

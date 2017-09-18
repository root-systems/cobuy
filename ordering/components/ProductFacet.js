import { compose } from 'recompose'
import { map } from 'ramda'
import { connect as connectFela } from 'react-fela'
import { Field } from 'redux-form'
import { RadioButtonGroup } from 'redux-form-material-ui'
import { RadioButton } from 'material-ui/RadioButton'
import h from 'react-hyperscript'

import { FormattedMessage } from '../../lib/Intl'

import styles from '../styles/ProductFacet'

function ProductFacet (props) {
  const { styles, facet } = props

  return (
    h('div', {
      className: styles.container
    }, [
      h('div', {
        className: styles.nameContainer
      }, [
        h('h3', {
          className: styles.nameText
        }, facet.name)
      ]),
      h('div', {
        className: styles.valuesContainer
      }, [
        h(Field, {
          name: facet.name,
          component: RadioButtonGroup,
          className: styles.buttonsContainer
        }, map((facetValue) => {
          return h(RadioButton, {
            label: facetValue.name,
            value: facetValue.id
          })
        }, facet.values))
      ])
    ])
  )
}

export default compose(
  connectFela(styles)
)(ProductFacet)

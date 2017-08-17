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
import Button from '../../app/components/Button'

function ProductItemList (props) {
  const { styles, fields } = props

  return h('div', {
    className: styles.itemListContainer
  }, [
    fields.map((productItem, index) => (
      h(ProductItem, {
        key: index,
        fields,
        productItem,
        index,
        styles
      })
    )),
    h('div', {
      className: styles.addItemButtonContainer,
    }, [
      h(RaisedButton, {
        className: styles.button,
        type: 'button',
        onClick: () => fields.push({})
      }, [
        h(FormattedMessage, {
          id: 'supply.addItem',
          className: styles.buttonText
        })
      ])
    ])
  ])
}

function ProductItem (props) {
  const { styles, productItem, fields, index } = props
  return h('div', {
    className: styles.itemContainer
  }, [
    h(Field, {
      name: `${productItem}.quantity.value`,
      component: TextField,
      floatingLabelText: (
        h(FormattedMessage, {
          id: 'supply.quantity',
          className: styles.labelText
        })
      )
    }),
    h(Field, {
      name: `${productItem}.quantity.unit`,
      component: SelectField,
      floatingLabelText: (
        h(FormattedMessage, {
          id: 'supply.unit',
          className: styles.labelText
        })
      )
    }, [
      h(MenuItem, {
        value: 'kg',
        primaryText: (
          h(FormattedMessage, {
            id: 'supply.kg',
            className: styles.labelText
          })
        )
      }),
      h(MenuItem, {
        value: 'litres',
        primaryText: (
          h(FormattedMessage, {
            id: 'supply.litres',
            className: styles.labelText
          })
        )
      }),
      h(MenuItem, {
        value: 'each',
        primaryText: (
          h(FormattedMessage, {
            id: 'supply.each',
            className: styles.labelText
          })
        )
      })
    ]),
    h(Field, {
      name: `${productItem}.resourceTypeId`,
      component: SelectField,
      floatingLabelText: (
        h(FormattedMessage, {
          id: 'supply.resourceType',
          className: styles.labelText
        })
      )
    }, [
      h(MenuItem, {
        value: 1,
        primaryText: 'egg'
      }),
      h(MenuItem, {
        value: 2,
        primaryText: 'carton'
      })
    ]),
    h('div', {
      className: styles.removeOfferingButtonContainer,
    }, [
      h(RaisedButton, {
        className: styles.button,
        type: 'button',
        onClick: () => fields.remove(index)
      }, [
        h(FormattedMessage, {
          id: 'supply.removeOffering',
          className: styles.buttonText
        })
      ])
    ])
  ])
}

function Product (props) {
  const { styles, setReducible, isReducible } = props
  return h('div', {
    className: styles.container
  }, [
    h('div', {
      className: styles.switchContainer
    }, [
      h(Field, {
        name: 'isReducible', // has items
        component: Toggle,
        label: (
          h(FormattedMessage, {
            id: 'supply.isReducible',
            className: styles.labelText
          })
        ),
        labelPosition: 'left',
        defaultToggled: false,
        value: isReducible,
        onChange: (e, val) => setReducible(val),
        elementStyle: { padding: 0, margin: 0 }
      })
    ]),
    ...(!isReducible ? [
      h(Field, {
        name: 'resourceType.name',
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'supply.resourceName',
            className: styles.labelText
          })
        ),
        component: TextField
      })
    ] : []),
    ...(isReducible ? [
      h(FieldArray, {
        name: 'items',
        component: ProductItemList,
        styles
      })
    ] : [])
  ])
}

export default compose(
  connectFela(styles),
  withState('isReducible', 'setReducible', false)
)(Product)

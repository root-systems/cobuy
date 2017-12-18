import h from 'react-hyperscript'
import { connect as connectFela } from 'react-fela'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { compose, withState, withHandlers } from 'recompose'

import styles from '../styles/OrdersPage'
import { FormattedMessage } from 'dogstack/intl'
import OrdersList from './OrdersList'
import OrderCreator from '../containers/OrderCreator'

function OrdersPage (props) {
  const { styles, actions, taskPlans, currentAgent, orders } = props
  const { isDialogOpen, closeDialog, openDialog } = props
  return (
    h('div', {
      className: styles.container
    }, [
      h('p', {
        className: styles.intro
      }, [
        h(FormattedMessage, {
          id: 'app.dashboard',
          className: styles.labelText
        })
      ]),
      h('div', {
        className: styles.ordersContainer
      }, [
        h(OrdersList, {
          actions,
          orders
        })
      ]),
      h(Dialog, {
        title: 'Create Order', // TODO intl
        actions: [
          h(RaisedButton, {
            type: 'submit',
            form: 'orderCreator',
            className: styles.button,
            onClick: closeDialog
          }, [
            h(FormattedMessage, {
              id: 'ordering.createOrder',
              className: styles.labelText
            })
          ]),
          h(FlatButton, {
            className: styles.button,
            onClick: closeDialog
          }, [
            h(FormattedMessage, {
              id: 'app.cancel',
              className: styles.labelText
            })
          ])
        ],
        modal: false,
        open: isDialogOpen,
        onRequestClose: closeDialog
      }, [
        h(OrderCreator)
      ]),
      h(FloatingActionButton, {
        onClick: openDialog
      }, [
        h(ContentAdd)
      ])
    ])
  )
}

export default compose(
  connectFela(styles),
  withState('isDialogOpen', 'setDialogOpen', false),
  withHandlers({
    openDialog: ({ setDialogOpen }) => () => setDialogOpen(true),
    closeDialog: ({ setDialogOpen }) => () => setDialogOpen(false),
  })
)(OrdersPage)

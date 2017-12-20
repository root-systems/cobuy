import h from 'react-hyperscript'
import { reduxForm, Field } from 'redux-form'
import { connect as connectFela } from 'react-fela'
import { compose } from 'recompose'
import { isNil, path, isEmpty, pipe, any, prop, difference, keys, tap, not, map, merge } from 'ramda'
import { TextField, SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import { FormattedMessage } from 'dogstack/intl'
import { required } from '@root-systems/redux-form-validators'

import currentAgentMissingAnyGroupProfiles from '../../tasks/util/currentAgentMissingAnyGroupProfiles'

import styles from '../styles/OrderCreator'

const getOrderIdFromTaskPlan = path(['params', 'orderId'])
const getIdsFromProfiles = map(prop('id'))
const missingAnyProfiles = pipe(
  difference,
  isEmpty,
  not
)

const renderAgentsAsMenuItems = map(agent => {
  return h(MenuItem, {
    key: agent.agentId,
    value: agent.agentId,
    primaryText: agent.name
  })
})

// need to pass down the choices to each instance of the selection component

const OrderCreator = (props) => {
  const {
    styles,
    actions,
    form,
    handleSubmit,
    currentAgent,
    currentAgentGroupIds,
    currentAgentGroupProfiles,
    currentAgentGroupSupplierIds,
    currentAgentGroupSupplierProfiles,
    currentAgentGroupMemberIds,
    currentAgentGroupMemberProfiles
  } = props

  if (
    isNil(currentAgent) ||
    isNil(currentAgentGroupIds) ||
    currentAgentMissingAnyGroupProfiles(currentAgent) ||
    missingAnyProfiles(currentAgentGroupSupplierIds, getIdsFromProfiles(currentAgentGroupSupplierProfiles)) ||
    missingAnyProfiles(currentAgentGroupMemberIds, getIdsFromProfiles(currentAgentGroupMemberProfiles))
  ) {
    return (
      h(CircularProgress)
    )
  }

  return (
    h('form', {
      onSubmit: handleSubmit,
      id: form,
      className: styles.container
    }, [
      h(Field, {
        name: 'consumerAgentId',
        component: SelectField,
        onChange: (ev) => {
          // TODO: IK: filter the supplier profiles based on which group was selected
          // TODO: IK: filter the admin profiles based on which group was selected
        },
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'agents.consumer',
            className: styles.labelText
          })
        ),
        validate: [required()]
      }, [
        h(MenuItem, {
          value: 'NEW_CONSUMER', // (mw) should this be a Symbol() ?
          primaryText: 'NEW CONSUMER'
        }),
        renderAgentsAsMenuItems(currentAgentGroupProfiles)
      ]),
      h(Field, {
        name: 'supplierAgentId',
        component: SelectField,
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'agents.supplier',
            className: styles.labelText
          })
        ),
        validate: [required()]
      }, [
        h(MenuItem, {
          value: 'NEW_SUPPLIER', // (mw) should this be a Symbol() ?
          primaryText: 'NEW SUPPLIER'
        }),
        renderAgentsAsMenuItems(currentAgentGroupSupplierProfiles)
      ]),
      /*
      h(Field, {
        name: 'name',
        component: TextField,
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'ordering.orderName',
            className: styles.labelText
          })
        ),
        validate: [required()]
      }),
      */
    ])
  )
}

export default compose(
  reduxForm({
    form: 'orderCreator'
  }),
  connectFela(styles)
)(OrderCreator)

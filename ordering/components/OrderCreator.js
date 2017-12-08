import h from 'react-hyperscript'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'recompose'
import { isNil, path, isEmpty, pipe, any, prop, difference, keys, tap, not, map, merge } from 'ramda'
import { TextField, SelectField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'dogstack/intl'

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
  const { actions, currentAgent, currentAgentGroupIds, currentAgentGroupProfiles, currentAgentGroupSupplierIds, currentAgentGroupSupplierProfiles, currentAgentGroupMemberIds, currentAgentGroupMemberProfiles } = props

  if (isNil(currentAgent)) return null
  if (isEmpty(currentAgentGroupIds)) return null
  if (currentAgentMissingAnyGroupProfiles(currentAgent)) return null
  if (missingAnyProfiles(currentAgentGroupSupplierIds, getIdsFromProfiles(currentAgentGroupSupplierProfiles))) return null
  if (missingAnyProfiles(currentAgentGroupMemberIds, getIdsFromProfiles(currentAgentGroupMemberProfiles))) return null

  return (
    h('form', [
      h(Field, {
        name: 'consumer',
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
        )
      }, [
        h(MenuItem, {
          value: null,
          primaryText: 'NEW'
        }),
        renderAgentsAsMenuItems(currentAgentGroupProfiles)
      ]),
      h(Field, {
        name: 'supplier',
        component: SelectField,
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'agents.supplier',
            className: styles.labelText
          })
        )
      }, [
        h(MenuItem, {
          value: null,
          primaryText: 'NEW'
        }),
        renderAgentsAsMenuItems(currentAgentGroupSupplierProfiles)
      ]),
      h(Field, {
        name: 'name',
        component: TextField,
        floatingLabelText: (
          h(FormattedMessage, {
            id: 'ordering.orderName',
            className: styles.labelText
          })
        )
      })
    ])
  )
}

export default compose(
  reduxForm({
    form: 'orderCreator'
  })
)(OrderCreator)

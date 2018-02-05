import h from 'react-hyperscript'
import { connect as connectFela } from 'react-fela'
import { isNil, isEmpty, map, concat } from 'ramda'
import { FormattedMessage } from 'dogstack/intl'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'

import styles from '../styles/MyGroups'

function MyGroups (props) {
  const { styles, currentAgent, currentAgentGroupProfiles = [], currentAgentGroupSupplierProfiles = [] } = props

  if (isNil(currentAgent)) {
    return null
  }

  const renderMyGroupProfiles = (type) => {
    return (groupProfiles) => {
      if (isEmpty(groupProfiles)) return null
      return h('div', { className: styles.myGroupsContainer }, [
        h('p', {
          className: styles.intro
        }, [
          h(FormattedMessage, {
            id: type === 'supplier' ? 'agents.mySupplierGroups' : 'agents.myBuyingGroups',
            className: styles.labelText
          })
        ]),
        h('ul', renderGroupProfiles(groupProfiles))
      ])
    }
  }

  const renderGroupProfiles = (groupProfiles) => {
    return map(renderGroupProfile, groupProfiles)
  }

  const renderGroupProfile = (profile) => {
    return h(Link, {
      className: styles.link,
      to: `/p/${profile.id}`
    }, [
      h('li', profile.name)
    ])
  }

  return h('div', {
    className: styles.container
  }, [
    renderMyGroupProfiles('buying')(currentAgentGroupProfiles),
    renderMyGroupProfiles('supplier')(currentAgentGroupSupplierProfiles)
  ])
}

export default compose(
  connectFela(styles)
)(MyGroups)

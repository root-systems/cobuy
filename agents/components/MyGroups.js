import h from 'react-hyperscript'
import { connect as connectFela } from 'react-fela'
import { isNil, isEmpty, map, concat } from 'ramda'
import { FormattedMessage } from 'dogstack/intl'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'

import styles from '../styles/MyGroups'

function MyGroups (props) {
  const { styles, currentAgent, currentAgentGroupProfiles = [], currentAgentGroupSupplierProfiles = [] } = props

  const combinedGroupProfiles = concat(currentAgentGroupProfiles, currentAgentGroupSupplierProfiles)

  if (isNil(currentAgent)) {
    return null
  }

  const renderMyGroups = () => {
    if (isEmpty(combinedGroupProfiles)) return null
    return h('div', { className: styles.myGroupsContainer }, [
      h('p', {
        className: styles.intro
      }, [
        h(FormattedMessage, {
          id: 'agents.myGroups',
          className: styles.labelText
        })
      ]),
      h('ul', renderCurrentAgentGroupProfiles())
    ])
  }

  const renderCurrentAgentGroupProfiles = () => {
    return map(renderCurrentAgentGroupProfile, combinedGroupProfiles)
  }

  const renderCurrentAgentGroupProfile = (profile) => {
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
    renderMyGroups()
  ])
}

export default compose(
  connectFela(styles)
)(MyGroups)

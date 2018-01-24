import h from 'react-hyperscript'
import { connect as connectFela } from 'react-fela'
import { isNil, isEmpty, map } from 'ramda'
import { FormattedMessage } from 'dogstack/intl'
import { compose } from 'recompose'

// import Profile from '../../agents/components/Profile'
import styles from '../styles/MyGroups'

function MyGroups (props) {
  const { styles, currentAgent, currentAgentGroupProfiles } = props

  if (isNil(currentAgent)) {
    return null
  }

  const renderMyGroups = () => {
    if (isEmpty(currentAgentGroupProfiles)) return null
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
    return map(renderCurrentAgentGroupProfile, currentAgentGroupProfiles)
  }

  const renderCurrentAgentGroupProfile = (profile) => {
    return h('li', profile.name)
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

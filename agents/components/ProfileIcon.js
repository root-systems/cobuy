import h from 'react-hyperscript'
import { connect } from 'react-fela'
import { isNil } from 'ramda'

import styles from '../styles/ProfileIcon'

// TODO (mw) use mui Avatar directly?
import Avatar from './Avatar'

const imageSizePerFormat = {
  page: 'large',
  icon: 'small'
}

function ProfileIcon (props) {
  const {
    styles,
    format,
    agent
  } = props
  if (isNil(agent)) return null
  const { profile } = agent
  if (isNil(profile)) return null
  const { name, avatar } = profile

  return (
    h('div', {
      className: styles.container
    }, [
      h(Avatar, {
        size: imageSizePerFormat[format],
        avatar
      }),
      h('span', {
        className: styles.name
      }, [
        name
      ])
    ])
  )
}

ProfileIcon.defaultProps = {
  format: 'page'
}

export default connect(styles)(ProfileIcon)

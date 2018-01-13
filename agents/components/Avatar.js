import h from 'react-hyperscript'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect as connectStyles } from 'react-fela'
import { isNil, not, and, either, isEmpty } from 'ramda'
import MuiAvatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'

import styles from '../styles/ProfileIcon'

// (mw) these values are _arbitrary_!
// TODO make them more legit
const sizeInPx = {
  small: 40,
  medium: 60,
  large: 80
}

export default compose(
  connectStyles(styles)
)(Avatar)

function Avatar (props) {
  const {
    styles,
    agent,
    size,
    icon,
    dirtyAvatar = ''
  } = props

  const hasDirtyAvatar = not(isEmpty(dirtyAvatar))

  const hasIcon = not(isNil(icon))

  if (isNil(agent)) return null

  const { profile } = agent

  if (isNil(profile)) return null

  const { name, avatar } = profile

  const hasName = not(isNil(name))
  const hasAvatar = not(isNil(avatar))

  const shouldDisplayIcon = and(not(hasAvatar), not(hasDirtyAvatar), not(hasName), hasIcon)

  const src = hasDirtyAvatar ? dirtyAvatar : hasAvatar ? avatar : null

  return (
    h('div', {
      className: styles.container
    }, [
      h(MuiAvatar, {
        className: styles.avatar,
        size: sizeInPx[size],
        icon: (
          shouldDisplayIcon
            ? h(FontIcon, {
                className: `fa fa-${icon}`
              })
            : null
        ),
        src: src
      }, [
        and(not(hasAvatar), hasName)
          ? name.substring(0, 1)
          : null
      ])
    ])
  )
}

Avatar.propTypes = {
  avatar: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
}

Avatar.defaultProps = {
  size: 'small'
}

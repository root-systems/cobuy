import h from 'react-hyperscript'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect as connectStyles } from 'react-fela'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import { FormattedMessage } from 'dogstack/intl'

import styles from '../styles/Hint'

export default compose(
  connectStyles(styles)
)(Hint)

function Hint (props) {
  const {
    styles,
    messageId,
    icon
  } = props

  return (
    h(IconButton, {
      tooltip: (
        h(FormattedMessage, {
          id: messageId,
          className: styles.tooltip
        })
      )
    }, [
      h(FontIcon, {
        className: `fa fa-${icon}-circle`
      })
    ])
  )
}

Hint.propTypes = {
  messageId: PropTypes.string.isRequired,
  icon: PropTypes.oneOf([
    'info',
    'question'
  ])
}

Hint.defaultProps = {
  icon: 'info'
}

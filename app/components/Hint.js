import h from 'react-hyperscript'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect as connectStyles } from 'react-fela'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

import styles from '../styles/Hint'

export default compose(
  connectStyles(styles)
)(Hint)

function Hint (props) {
  const { text, icon } = props

  return (
    h(IconButton, {
      tooltip: text
    }, [
      h(FontIcon, {
        className: `fa fa-${icon}-circle`
      })
    ])
  )
}

Hint.propTypes = {
  text: PropTypes.isRequired,
  icon: PropTypes.oneOf([
    'info',
    'question'
  ])
}

Hint.defaultProps = {
  icon: 'info'
}

import h from 'react-hyperscript'
import { compose } from 'recompose'
import { connect as connectStyles } from 'react-fela'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

import styles from '../styles/Hint'

export default compose(
  connectStyles(styles)
)(Hint)

function Hint (props) {
  const { text } = props

  return (
    h(IconButton, {
      tooltip: text
    }, [
      h(FontIcon, {
        className: 'fa fa-info-circle'
        // className: 'fa fa-question-circle'
        // className: 'fa fa-info'
        // className: 'fa fa-question'
      })
    ])
  )
}

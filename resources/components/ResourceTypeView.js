import h from 'react-hyperscript'
import RaisedButton from 'material-ui/RaisedButton'
import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/ResourceTypeEditor'

function ResourceTypeView (props) {
  return h('ul', [
    h('li', {
      className: styles.resourceImage
    }),
    h(RaisedButton, {
      className: styles.submitButton,
      type: 'button',
      onClick: (ev) => {
        // GK: not entirely clear why this is necessary considering the button type, but preventing default anyway
        ev.preventDefault()
        props.toggleEdit()
      }
    }, [
      h(FormattedMessage, {
        id: 'resources.editResource',
        className: styles.labelText
      })
    ])
  ])
}

export default ResourceTypeView

import h from 'react-hyperscript'
import { connect as connectFela } from 'react-fela'
import { compose } from 'recompose'

import styles from '../styles/NavTitle'

function NavTitle (props) {
  const { styles, src } = props
  
  return h('div', {
    className: styles.container
  }, [
    h('img', { src, className: styles.logo })
  ])
}

export default compose(
  connectFela(styles)
)(NavTitle)
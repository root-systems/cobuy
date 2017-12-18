import h from 'react-hyperscript'
import { isNil, map } from 'ramda'
import { compose } from 'recompose'
import { connect as connectFela, withTheme } from 'react-fela'
import { FormattedMessage } from 'dogstack/intl'
import { Link } from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon'

import styles from '../styles/OrderStep'

function OrderStep ({ step, styles, theme }) {
  const { name, description, icon, taskPlan, completed, ready } = step

  const hasTaskPlan = !isNil(taskPlan)
  const maybeLink = children => {
    return hasTaskPlan
      ? h(Link, {
          className: styles.link, 
          to: `/tasks/${taskPlan.id}`
        }, children)
      : children
  }

  return (
    h('li', {
      className: styles.container
    }, maybeLink([
      h('span', {
        className: styles.icon
      }, [
        h(FontIcon, {
          className: icon,
          color: ready ? theme.colors.primary2 : undefined
        })
      ]),
      h('div', {
        className: styles.info
      }, [
        h('h3', {
          className: styles.name
        }, [
          name
        ]),
        h('p', {
          className: styles.description
        }, [
          description
        ])
      ])
    ]))
  )
}

export default compose(
  connectFela(styles),
  withTheme
)(OrderStep)

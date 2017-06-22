import PropTypes from 'prop-types'
import React from 'react'
import { createComponent } from 'react-fela'

import styles from '../styles/Button'

const Button = createComponent(styles, 'button', ['onClick', 'type'])

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

Button.defaultProps = {
  onClick: () => {},
  type: 'button'
}

export default Button

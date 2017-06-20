import PropTypes from 'prop-types'
import React from 'react'
import { createComponent } from 'react-fela'

const Button = createComponent(() => ({
  border: '1px solid #eee',
  borderRadius: 3,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 15,
  padding: '3px 10px',
  margin: 10
}), 'button', ['onClick'])

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

Button.defaultProps = {
  onClick: () => {}
}

export default Button

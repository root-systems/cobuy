import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

function RemoteAuthenticationMethod (props) {
  const {
    name,
    label,
    icon,
    backgroundColor,
    hoverColor
  } = props
  return (
    <RaisedButton
      label={label}
      icon={<FontIcon className={icon} />}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      fullWidth={true}
      href={`/auth/${name}`}
    />
  )
}

export default RemoteAuthenticationMethod

import EventEmitter from 'events'
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

window.authAgent = new EventEmitter()

function RemoteAuthenticationMethod (props) {
  const {
    name,
    label,
    icon,
    backgroundColor,
    hoverColor,
    signIn
  } = props

  return (
    <RaisedButton
      label={label}
      icon={<FontIcon className={icon} />}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      fullWidth={true}
      onClick={handleClick}
    />
  )

  function handleClick (ev) {
    const url = `/auth/${name}`
    const title = `Cobuy sign in with ${name}`

    listenSignInPopup(openSignInPopup({ url, title }))
  }

  function listenSignInPopup (popup) {
    if (popup.closed) {
      console.log('cancel!')
      // cancel()
    } else {
      let token
      try {
        token = popup.token
      } catch (err) {}
      if (token && token.accessToken) {
        const { accessToken } = token
        signIn({ strategy: 'jwt', accessToken })
        popup.close()
      } else {
        setTimeout(() => listenSignInPopup(popup), 0)
      }
    }
  }
}

export default RemoteAuthenticationMethod

/*
 * A helper function that opens the provided URL in a centered popup.
 * Accepts an `options` object with `width` and `height` number properties.
 */
// from https://github.com/feathersjs/feathers-authentication-popups/blob/master/src/feathers-authentication-popups.js
function openSignInPopup (options = {}) {
  const { url, title } = options
  let width = options.width || 1024
  let height = options.height || 640
  let {top, left} = getCenterCoordinates(window, width, height)
  let params = `width=${width}, height=${height}, top=${top}, left=${left}`
  return window.open(url, title, params)
}

/*
 * Returns the coordinates to center a popup window in the viewport with
 * the provided width and height args.
 */
// from https://github.com/feathersjs/feathers-authentication-popups/blob/master/src/feathers-authentication-popups.js
function getCenterCoordinates (window, width, height) {
  return {
    left: window.screenX + ((window.outerWidth - width) / 2),
    top: window.screenY + ((window.outerHeight - height) / 2)
  }
}

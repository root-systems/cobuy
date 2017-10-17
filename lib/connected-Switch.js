// TODO: IK: this is a temp component to address issues with react-router-redux 5.0.0-alpha.6
// with normal Switch, keeping location state in sync with the URL is problematic
// see here https://github.com/ReactTraining/react-router/issues/5072
import { connect } from 'react-redux'
import { Switch } from 'react-router'

const ConnectedSwitch = connect((state) => {
  return { location: state.router.location }
})(Switch)

export default ConnectedSwitch

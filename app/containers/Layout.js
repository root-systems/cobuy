import { connect } from 'react-redux'

import Layout from '../components/Layout'

import getLayoutProps from '../getters/getLayoutProps'

export default connect(
  getLayoutProps
)(Layout)

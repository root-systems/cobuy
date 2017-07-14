import { connect } from 'react-redux'

import Layout from '../components/Layout'

import { getLayoutProps } from '../getters'

export default connect(
  getLayoutProps
)(Layout)

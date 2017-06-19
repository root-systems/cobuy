import { connect } from 'react-redux'

import Layout from '../components/layout'

import { getLayoutProps } from '../getters'

export default connect(
  getLayoutProps
)(Layout)

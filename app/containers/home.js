import { connect } from 'react-redux'

import Home from '../components/home'

import { getHomeProps } from '../getters'

export default connect(
  getHomeProps
)(Home)

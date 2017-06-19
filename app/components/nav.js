import React from 'react'
import { createComponent } from '@ahdinosaur/react-fela'
import { NavLink } from 'react-router-dom'
import { pipe, map, values } from 'ramda'

import styles from '../styles/nav'

const Container = createComponent(styles.container, 'nav')

export default function Nav (props) {
  const { navigationRoutes } = props

  return <Container>
    {mapRouteLinks(navigationRoutes)}
  </Container>
}

const mapRouteLinks = pipe(
  map(route => {
    const {
      path,
      name = path,
      title = name,
      Component
    } = route

    return (
      <NavLink to={path} key={name}>
        {title}
      </NavLink>
    )
  }),
  values
)

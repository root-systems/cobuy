import React from 'react'
import { createComponent } from '@ahdinosaur/react-fela'

import styles from '../styles/home'

const Container = createComponent(styles.container, 'div')

export default function Home (props) {
  const { routes } = props

  return <Container>
    Cobuy!
  </Container>
}

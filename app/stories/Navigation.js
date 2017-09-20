import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'

import Navigation from '../components/Navigation'

storiesOf('app.Navigation', module)
  .add('default', () => (
    h(Navigation, {
      navigationRoutes: [
        {
          name: 'home',
          path: '/',
          exact: true,
          navigation: {
            title: 'app.home',
            icon: 'fa fa-home'
          }
        },
        {
          name: 'sunshine',
          path: '/sun',
          exact: true,
          navigation: {
            title: 'sunshine',
            icon: 'fa fa-sun-o'
          }
        },
        {
          name: 'rain',
          path: '/rain',
          exact: true,
          navigation: {
            title: 'rain',
            icon: 'fa fa-tint'
          }
        },
        {
          name: 'abundance',
          path: '/abundance',
          exact: true,
          navigation: {
            title: 'abundance',
            icon: 'fa fa-heart'
          }
        },

      ]
    })
  ))

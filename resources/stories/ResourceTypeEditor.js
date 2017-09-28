import h from 'react-hyperscript'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ResourceTypeEditor from '../components/ResourceTypeEditor'

const resourceTypes = {
  1: {
    id: 101,
    name: 'crayons',
    description: 'these are crayons. look at all the pretty colours! they are made of beeswax. you could probably eat them and not die.',
    image: 'http://www.mercurius-australia.com/site/images/1250623.jpg'
  },
  2: {
    id: 102,
    name: 'coloured pencils',
    description: 'these are pencils that are coloured',
    image: 'http://thewoodenwagon.com/Merchant2/graphics/00000001/ACST85090912-2.jpg'
  }
}

const nestedResourceType = {
  id: 103,
  name: 'carton of eggs',
  description: "you gotta love 'em!",
  image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/eggs_slideshow/getty_photo_of_eggs_in_carton.jpg',
  items: [
    {
      quantity: {
        value: '1',
        unit: 'each'
      },
      resourceTypeId: 2
    },
    {
      quantity: {
        value: '12',
        unit: 'each'
      },
      resourceTypeId: 1
    }
  ]
}

storiesOf('resources.ResourceTypeEditor', module)
  .add('empty', () => (
    h(ResourceTypeEditor, {
      onSubmit: action('submit'),
      resourceTypes
    })
  ))
  .add('simple', () => (
    h(ResourceTypeEditor, {
      onSubmit: action('submit'),
      resourceType: resourceTypes[1],
      resourceTypes
    })
  ))
  .add('nested', () => (
    h(ResourceTypeEditor, {
      onSubmit: action('submit'),
      resourceType: nestedResourceType,
      resourceTypes
    })
  ))

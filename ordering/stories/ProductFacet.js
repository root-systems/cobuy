import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { reduxForm, Field } from 'redux-form'
import h from 'react-hyperscript'

import ProductFacet from '../components/ProductFacet'

// https://github.com/root-systems/cobuy/wiki/Models
const mockFacetInfo = {
  id: 345,
  resourceTypeId: 123,
  name: 'colour',
  description: 'the colour of each crayon',
  values: [
    {
      id: 678,
      resourceTypeFacetId: 345,
      name: 'blue'
    },
    {
      id: 679,
      resourceTypeFacetId: 345,
      name: 'orange'
    },
    {
      id: 680,
      resourceTypeFacetId: 345,
      name: 'purple'
    }
  ]
}

const FacetForm = props => {
  const { handleSubmit } = props
  return (
    h('form', {
      onSubmit: handleSubmit
    }, [
      h(Field, {
        name: 'facet',
        component: ProductFacet,
        facet: mockFacetInfo
      })
    ])
  )
}

const ConnectedFacetForm = reduxForm({ form: 'facet' })(FacetForm)

storiesOf('ordering.ProductFacet', module)
  .add('default', () => (
    h(ConnectedFacetForm)
  ))

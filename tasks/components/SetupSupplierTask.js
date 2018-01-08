import h from 'react-hyperscript'
import { isNil, merge, isEmpty } from 'ramda'

import TaskStepper from './TaskStepper'
import Profile from '../../agents/components/Profile'
import ProductListEditor from '../../supply/components/ProductListEditor'
import ResourceTypeEditor from '../../resources/components/ResourceTypeEditor'

export default (props) => {
  const { taskPlan, actions, products } = props
  if (isNil(taskPlan)) return null
  const { params: { supplierAgent } } = taskPlan
  if (isNil(supplierAgent)) return null

  const { profile } = supplierAgent

  const steps = [
    {
      id: 'tasks.steps.supplierProfile',
      content: h(Profile, {
        initialValues: profile,
        updateProfile: (nextProfile) => {
          actions.profiles.update(profile.id, merge(nextProfile, { agentId: supplierAgent.id }))
        },
        agentType: 'supplier'
      })
    },
    {
      id: 'tasks.steps.supplierProducts',
      // TODO (mw) move methods to product editor container
      content: h(ProductListEditor, {
        products,
        createProduct: () => {
          actions.products.create({
            supplierAgentId: supplierAgent.id
          })
        },
        saveProduct: (product) => {
          const {
            id: productId,
            resourceType,
            priceSpecs
          } = product

          console.log('saving product', product)

          if (resourceType != null) {
            actions.resourceTypes.update(resourceType.id, resourceType)
          }

          if (priceSpecs != null) {
            priceSpecs.forEach(priceSpec => {
              const nextPriceSpec = merge(priceSpec, { productId })
              if (nextPriceSpec.id) {
                actions.priceSpecs.update(nextPriceSpec.id, nextPriceSpec)
              } else {
                actions.priceSpecs.create(nextPriceSpec)
              }
            })
          }
        }
      })
    }
  ]

  return h(TaskStepper, {
    steps
  })
}

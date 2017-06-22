import { configure, addDecorator } from '@storybook/react'

import initFelaStorybook from '../helpers/initFelaStorybook'
import initFormStorybook from '../helpers/initFormStorybook'
import initMuiStorybook from '../helpers/initMuiStorybook'

const FelaProvider = initFelaStorybook()
const FormProvider = initFormStorybook()
const MuiProvider = initMuiStorybook()

// global decorators applied to all stories
addDecorator(FelaProvider)
addDecorator(FormProvider)
addDecorator(MuiProvider)

require('./Button')
require('./TextField')
require('./AvatarField')

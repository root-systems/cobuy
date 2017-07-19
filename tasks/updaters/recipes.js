import { updateStateAt, decorate, withDefaultState } from 'redux-fp'
import { identity } from 'ramda'
import * as taskRecipes from '../data/recipes'

export default decorate(
  updateStateAt('taskRecipes'),
  withDefaultState(taskRecipes),
  action => identity
)

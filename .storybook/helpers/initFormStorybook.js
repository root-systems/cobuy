import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { default as logger } from 'redux-logger'
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers({
  form: formReducer
})

const enhancer = applyMiddleware(
  logger
)

const store = createStore(reducer, undefined, enhancer)

export default () => story => {
  return (
    <ReduxProvider store={store}>
      {story()}
    </ReduxProvider>
  )
}

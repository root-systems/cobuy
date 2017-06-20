import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers({
  form: formReducer
})

const store = createStore(reducer)

export default () => story => {
  return (
    <ReduxProvider store={store}>
      {story()}
    </ReduxProvider>
  )
}

import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import App from './App'

const initialState = {
  input: {
    firstname: {
      value: '',
      isValid: false,
    },
  },
}

it('should have label element with label "firstname"', () => {
  const mockStore = configureStore()
  const store = mockStore(initialState)
  const { getByLabelText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(getByLabelText('firstname')).toBeInTheDocument()
})

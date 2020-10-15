const inputReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        [action.input]: {
          value: action.payload,
        },
      }
    case 'VALIDATE':
      return {
        ...state,
        [action.input]: {
          value: action.payload.value,
          isValid: action.payload.validation(action.payload.value),
        },
      }
    default:
      return state
  }
}
export { inputReducer }

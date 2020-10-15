export const setInput = (payload) => ({
  type: 'SET',
  payload: payload.value,
  input: payload.name
})

export const validateInput = (payload) => ({
  type: 'VALIDATE',
  payload: payload,
  input: payload.name
})
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInput, validateInput } from '../../redux/input/action/input.action'
import s from './TextArea.module.scss'

const TextArea = (props) => {
  const input = useSelector((state) => state.input[props.name])
  const inputValue = input?.value || ''
  const dispatch = useDispatch()

  useEffect(() => {
    validate()
  }, [props.validation])

  const validate = () => {
    dispatch(
      validateInput({
        value: inputValue,
        name: props.name,
        validation: props.validation,
      })
    )
  }

  const handleOnChange = (event) => {
    const { value } = event.target
    dispatch(setInput({ value, name: props.name }))
  }

  return (
    <div className={s.root}>
      <label htmlFor={props.name}>{props.label}</label>
      <textarea
        name={props.name}
        value={inputValue}
        onChange={handleOnChange}
      />
    </div>
  )
}

export default TextArea

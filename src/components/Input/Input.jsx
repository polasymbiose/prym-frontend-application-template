import classNames from 'classnames/bind'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInput, validateInput } from '../../redux/input/action'
import s from './Input.module.scss'
const cx = classNames.bind(s)

const Input = ({ type = 'text', ...props }) => {
  const input = useSelector((state) => state.input[props.name])
  const inputValue = input?.value || ''
  const dispatch = useDispatch()

  const validate = () => {
    dispatch(
      validateInput({
        value: inputValue,
        name: props.name,
        validation: props.validation,
      })
    )
  }

  useEffect(() => {
    validate()
  }, [props.validation])

  const handleOnChange = (event) => {
    const { value } = event.target
    dispatch(setInput({ value, name: props.name }))
  }

  return (
    <div className={s.root}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        name={props.name}
        aria-label={props.name}
        value={inputValue}
        type={type}
        onChange={handleOnChange}
        className={cx({
          invalid: !input?.isValid && inputValue.length > 0,
        })}
        onBlur={validate}
      />
    </div>
  )
}

export default Input

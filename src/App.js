import classNames from 'classnames/bind'
import React, { useMemo, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import s from './App.module.scss'
import Input from './components/Input/Input'
import TextArea from './components/TextArea/TextArea'
const cx = classNames.bind(s)

function App() {
  const input = useSelector((state) => state.input)
  const [showAddressDetails, setShowAddressDetails] = useState(false)

  const validSubmission = useMemo(() => {
    const inputs = Object.values(input).map((val) => val)
    return inputs.every((key) => !!key.isValid)
  }, [input, showAddressDetails])

  return (
    <div className={s.root}>
      <div className={s.rock}>
        Lets Rock!{' '}
        <span aria-label={'rock'} role={'img'}>
          🤘
        </span>
      </div>

      <form>
        <Input
          name={'lastname'}
          label={'Last name*'}
          validation={useCallback((value) => value.length >= 2, [])}
        />
        <Input
          name={'firstname'}
          label={'First name*'}
          validation={useCallback((value) => value.length >= 2, [])}
        />
        <Input
          name={'nickname'}
          label={'Nickname'}
          validation={useCallback(() => true, [])}
        />
        <Input
          name={'email'}
          type={'email'}
          label={'Email*'}
          validation={useCallback((value) => {
            const regex = RegExp(
              "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
            )
            return regex.test(value)
          }, [])}
        />
        <Input
          name={'password'}
          type={'password'}
          label={'Password*'}
          validation={useCallback((value) => {
            const regex = RegExp('^(?=.*?\\d.*\\d)[a-zA-Z0-9]{6,}$')
            return regex.test(value)
          }, [])}
        />
        <Input
          name={'repeatPassword'}
          type={'password'}
          label={'Repeat password*'}
          validation={useCallback((value) => value === input.password?.value, [
            input.password,
          ])}
        />

        <div className={s.checkbox}>
          <label htmlFor={'showAddress'}>Show Address</label>
          <input
            type='checkbox'
            name={'showAddress'}
            aria-label={'showAddress'}
            defaultChecked={showAddressDetails}
            onChange={() => {
              setShowAddressDetails((p) => !p)
            }}
          />
        </div>

          <div
            className={cx({
              address: true,
              visible: showAddressDetails,
            })}
          >
            <Input
              name={'street'}
              label={'Street*'}
              validation={useCallback(
                (value) => value.length >= 4 || !showAddressDetails,
                [showAddressDetails]
              )}
            />
            <Input
              name={'house'}
              label={'House/Apartment'}
              validation={useCallback(() => true, [])}
            />
            <Input
              type={'number'}
              name={'zip'}
              label={'ZIP*'}
              validation={useCallback(
                (value) => value.length === 5 || !showAddressDetails,
                [showAddressDetails]
              )}
            />
            <Input
              type={'string'}
              name={'city'}
              label={'City*'}
              validation={useCallback(
                (value) => value.length >= 4 || !showAddressDetails,
                [showAddressDetails]
              )}
            />
          </div>

        <TextArea
          type={'string'}
          name={'additionalInformation'}
          label={'Additional information'}
          validation={useCallback(() => true, [])}
        />

        <button
          disabled={!validSubmission}
          type='submit'
          name='submit'
          onClick={(e) => {
            e.preventDefault()
            console.log('submit')
          }}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default App

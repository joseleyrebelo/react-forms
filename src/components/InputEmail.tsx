import React from 'react'
import Input, { InputProps } from './Input'

const InputEmail = (props: InputProps) => {
  return <Input {...props} type={'email'} validation={'email'} />
}

export default InputEmail

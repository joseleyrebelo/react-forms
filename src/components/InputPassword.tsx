import React, { useState } from 'react'

import Input, { InputProps } from './Input'

const InputPassword = (props: InputProps) => {
  const [showPassword] = useState(false)

  // @todo toggle -- setShowPassword
  return <Input type={showPassword ? 'text' : 'password'} validation={{ type: 'password' }} {...props} />
}

export default InputPassword

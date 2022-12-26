import React, { useContext } from 'react'
import FormContext from '../context/FormContext'
import { getTransitions } from '../helpers/utils/uiSetup'

interface Props {
  onSubmit: () => void
}

const Submit = ({ ...props }: Props) => {
  const formContext = useContext(FormContext)
  const onClick = () => {
    if (formContext.isValid) props.onSubmit()
  }
  return (
    <div
      style={{
        transition: getTransitions(['background', 'border']),
        width: '100%',
        padding: '16px 48px 16px 24px',
        borderRadius: '10px',
        border: '1px solid #ddd',
        boxSizing: 'border-box',
        boxShadow: '0px 0px 10px rgba(0,0,0,.05)',
        backgroundColor: '#057DCD',
        fontSize: '13px',
        fontWeight: 700,
        color: 'white',
        cursor: 'pointer',
        opacity: formContext.isValid ? '1' : '.5',
      }}
      onClick={onClick}
    >
      Submit
    </div>
  )
}

export default Submit

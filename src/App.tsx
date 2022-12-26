import './App.css'
import { Form } from './context/FormContext'
import Submit from './components/Submit'
import InputPassword from './components/InputPassword'
import InputEmail from './components/InputEmail'
import React from 'react'

function App() {
  return (
    <div className='App'>
      <Form>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0px 15px' }}>
          <p>Form Tools</p>
          <InputEmail name='email' />
          <InputPassword name='password' />
          <InputPassword
            name='match'
            validation={{
              type: 'match',
              relatedField: 'password',
            }}
          />
          <Submit onSubmit={() => console.log('OnSubmit is going through!')} />
        </div>
      </Form>
    </div>
  )
}

export default App

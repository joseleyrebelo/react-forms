import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import Input from '../src/components/Input'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<Input />)
  })
})
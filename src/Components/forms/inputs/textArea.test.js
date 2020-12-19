import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TextArea from './textArea'

describe('TextArea', () => {
  it('renders without errors', () => {
    render(<TextArea name="test" />)
  })

  it('activates from label click', () => {
    const label = 'Proper labels are good for accessibility'
    render(<TextArea label={label} name="test" />)

    userEvent.click(screen.getByText(label))

    expect(screen.getByRole('textbox')).toHaveFocus()
  })

  it('shows the placeholder', () => {
    const placeholder = 'This gives the user an idea of what to enter'
    render(<TextArea name="test" placeholder={placeholder} />)

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
  })

  it('sets the appropriate class when empty', () => {
    render(<TextArea isEmpty={true} name="test" />)

    expect(screen.getByRole('textbox')).toHaveClass('is-empty')
  })
})

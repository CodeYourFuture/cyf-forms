import React from 'react'
import { render, screen } from '@testing-library/react'
import selectEvent from 'react-select-event'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EmployerDropDown from './EmployerDropDown'

describe('EmployerDropDown', () => {
  it('shows the label value and place holder value', async () => {
    renderInForm({ employers: ['Arnold Clark'] })
    expect(screen.getByTestId('form')).toHaveTextContent(
      'Who is your employer? *'
    )
    expect(screen.getByTestId('form')).toHaveTextContent(
      'Type your employer name here'
    )
  })
  it('renders an input', async () => {
    renderInForm({ employers: ['Arnold Clark', 'Bankifi', 'Capgemini'] })
    await selectEvent.select(
      screen.getByLabelText(/who is your employer/i),
      'Capgemini'
    )
    expect(screen.getByTestId('form')).toHaveFormValues({
      employer: 'Capgemini'
    })
  })

  it('updates the rest of the form', async () => {
    const onChange = jest.fn()
    renderInForm({ employers: ['Deloitte', 'EDF', 'FlexJobs'], onChange })
    await selectEvent.select(
      screen.getByLabelText(/who is your employer/i),
      'EDF'
    )
    expect(onChange).toHaveBeenCalledWith({
      target: expect.objectContaining({
        name: 'employer',
        type: 'text',
        value: 'EDF'
      })
    })
  })

  it('applies the right class when empty', async () => {
    const { container } = renderInForm({ isEmpty: true })
    expect(container.getElementsByClassName('is-empty')).toHaveLength(1)
  })

  it('asks user to select "Other" if no matches', async () => {
    const { user } = renderInForm({ employers: ['G-Research'] })
    await user.type(screen.getByRole('combobox', { name: /employer/i }), 'cap')
    expect(
      screen.getByText('Employer not found? Please select "Other".')
    ).toBeInTheDocument()
  })

  it('shows the expected values in AC', async () => {
    const { user } = renderInForm({
      employers: [
        'BBC',
        'Bet365',
        'Blue Frontier',
        'EngineerBetter',
        'Brandwatch',
        'Equal Experts',
        'Infobip',
        'Synaptik Digital',
        'Tata Consultancy services',
        'Tamarix Tech',
        'Inspired Gaming Group',
        'EPAM System',
        'Blueprint Gaming',
        'Beamery',
        'American Express ',
        'Capgemini',
        'Amazon Web Services (AWS)',
        'Alpha FX Group',
        'Amazon',
        'Anaplan'
      ]
    })
    await user.type(screen.getByRole('combobox', { name: /employer/i }), 'am')
    const appearingEmployers = [
      'Amazon',
      'Amazon Web Services (AWS)',
      'American Express',
      'Beamery',
      'Blueprint Gaming',
      'EPAM System',
      'Inspired Gaming Group',
      'Tamarix Tech'
    ]

    appearingEmployers.forEach(employer =>
      expect(screen.getByText(employer)).toBeInTheDocument()
    )
  })
})
const renderInForm = ({
  employers = [],
  isEmpty = false,
  onChange = () => {}
}) => {
  const user = userEvent.setup()
  const wrapper = render(
    <form data-testid="form">
      <EmployerDropDown
        arrayList={employers.map(name => ({ _id: name, name }))}
        isEmpty={isEmpty}
        name="employer"
        onChange={onChange}
      />
    </form>
  )
  return { user, ...wrapper }
}

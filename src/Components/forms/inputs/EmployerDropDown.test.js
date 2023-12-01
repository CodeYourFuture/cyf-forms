import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import selectEvent from 'react-select-event'

import EmployerDropDown from './EmployerDropDown'

describe('EmployerDropDown', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

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

  it('allows the user to enter their own employer', async () => {
    const onChange = jest.fn()
    const { user } = renderInForm({
      employers: ['ABC', 'BBC', 'CBC'],
      onChange
    })
    await user.type(
      screen.getByRole('combobox', { name: /employer/i }),
      'Google'
    )
    await user.click(screen.getByText('Create "Google"'))
    expect(onChange).toHaveBeenCalledWith({
      target: { name: 'employer', type: 'text', value: 'Google' }
    })
  })

  it('adds the new employer to the list', async () => {
    const { user } = renderInForm({ employers: ['ABC', 'BBC', 'CBC'] })
    await user.type(
      screen.getByRole('combobox', { name: /employer/i }),
      'Google'
    )
    await user.click(screen.getByText('Create "Google"'))
    await selectEvent.select(
      screen.getByLabelText(/who is your employer/i),
      'BBC'
    )
    await selectEvent.select(
      screen.getByLabelText(/who is your employer/i),
      'Google'
    )
  })

  it('keeps the list in alphabetical order', async () => {
    const { container, user } = renderInForm({
      employers: ['ABC', 'BBC', 'CBC']
    })
    for (const employer of ['Boggle', 'Google', 'Aardvark']) {
      await user.type(
        screen.getByRole('combobox', { name: /employer/i }),
        `${employer}{enter}`
      )
    }
    await user.type(
      screen.getByRole('combobox', { name: /employer/i }),
      '{delete}'
    )
    expect(renderedItems(container)).toEqual([
      'Aardvark',
      'ABC',
      'BBC',
      'Boggle',
      'CBC',
      'Google'
    ])
  })

  describe('reminder', () => {
    const reminder =
      'This employer will be added to our list. Make sure you typed it correctly.'

    it('does not show message when no value is entered', () => {
      renderInForm({ employers: ['ABC', 'BBC', 'CBC'], value: '' })
      expect(screen.queryByText(reminder)).not.toBeInTheDocument()
    })

    it('does not show message when employer is in list', () => {
      renderInForm({ employers: ['ABC', 'BBC', 'CBC'], value: 'BBC' })
      expect(screen.queryByText(reminder)).not.toBeInTheDocument()
    })

    it('shows message when employer is custom entry', () => {
      renderInForm({ employers: ['ABC', 'BBC', 'CBC'], value: 'Google' })
      expect(screen.queryByText(reminder)).toBeInTheDocument()
    })
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

  it('can be cleared', async () => {
    const onChange = jest.fn()
    renderInForm({ employers: ['ABC', 'BBC', 'CBC'], onChange, value: 'BBC' })
    await selectEvent.clearAll(screen.getByLabelText(/who is your employer/i))
    expect(onChange).toHaveBeenCalledWith({
      target: { name: 'employer', type: 'text', value: '' }
    })
  })

  /**
   * @param {HTMLElement} container
   */
  const renderedItems = container => {
    const divs = Array.from(container.getElementsByTagName('div'))
    return divs
      .filter(el => el.getAttribute('aria-disabled') === 'false')
      .map(el => el.textContent)
  }
})
const renderInForm = ({
  employers = [],
  isEmpty = false,
  onChange = () => {},
  value = ''
}) => {
  const user = userEvent.setup()
  const wrapper = render(
    <form data-testid="form">
      <EmployerDropDown
        arrayList={employers.map(name => ({ _id: name, name }))}
        isEmpty={isEmpty}
        name="employer"
        onChange={onChange}
        value={value}
        postNewEmployer={jest.fn()}
      />
    </form>
  )
  return { user, ...wrapper }
}

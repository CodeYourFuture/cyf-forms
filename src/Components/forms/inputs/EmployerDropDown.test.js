import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import selectEvent from 'react-select-event'

import EmployerDropDown from './EmployerDropDown'

describe('EmployerDropDown', () => {
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
      screen.getByText('No matches found, please select "Other"')
    ).toBeInTheDocument()
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
        onChange={onChange}
      />
    </form>
  )
  return { user, ...wrapper }
}

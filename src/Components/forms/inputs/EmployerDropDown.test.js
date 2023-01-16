import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmployerDropDown from './EmployerDropDown'
const employerList = [
  { name: 'BBC', _id: 'BBC' },
  { name: 'Bet365', _id: 'Bet365' },
  { name: 'Blue Frontier', _id: 'Blue Frontier' },
  { name: 'EngineerBetter', _id: 'EngineerBetter' },
  { name: 'Brandwatch', _id: 'Brandwatch' },
  { name: 'Equal Experts', _id: 'Equal Experts' },
  { name: 'Infobip', _id: 'Infobip' },
  { name: 'Synaptik Digital', _id: 'Synaptik Digital' },
  { name: 'Tata Consultancy services', _id: 'Tata Consultancy services' },
  { name: 'Tamarix Tech', _id: 'Tamarix Tech' },
  { name: 'Inspired Gaming Group', _id: 'Inspired Gaming Group' },
  { name: 'EPAM System', _id: 'EPAM System' },
  { name: 'Blueprint Gaming', _id: 'Blueprint Gaming' },
  { name: 'Beamery', _id: 'Beamery' },
  { name: 'American Express ', _id: 'American Express ' },
  { name: 'Capgemini', _id: 'Capgemini' },
  {
    name: 'Amazon Web Services (AWS)',
    _id: 'Amazon Web Services (AWS)'
  },
  { name: 'Alpha FX Group', _id: 'Alpha FX Group' },
  { name: 'Amazon', _id: 'Amazon' },
  { name: 'Anaplan', _id: 'Anaplan' },
  { name: 'Alfa Financial Software', _id: 'Alfa Financial Software' }
]
describe('EmployerDropDown', () => {
  it('shows a matching option for specific word', async () => {
    const user = userEvent.setup()
    render(
      <EmployerDropDown
        arrayList={employerList}
        employerOnChange={() => {}}
        isEmpty={false}
      />
    )

    await user.type(screen.getByRole('textbox', { name: /employer/i }), 'cap')

    expect(
      screen.getByRole('option', { name: /capgemini/i })
    ).toBeInTheDocument()
  })
  expect(
    screen.queryByRole('option', { name: /Carnall Farrar/i })
  ).not.toBeInTheDocument()
  it('finds characters within words', async () => {
    const user = userEvent.setup()
    render(
      <EmployerDropDown
        arrayList={employerList}
        employerOnChange={() => {}}
        isEmpty={false}
      />
    )

    await user.type(screen.getByRole('textbox', { name: /employer/i }), 'am')

    expect(
      screen.getByRole('option', { name: 'Amazon Web Services (AWS)' })
    ).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Amazon' })).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: /American/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Beamery' })).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: 'Blueprint Gaming' })
    ).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /EPAM/i })).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: /Inspired Gaming /i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: 'Tamarix Tech' })
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('option', { name: 'bmc' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('option', { name: 'Alpha FX Group' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('option', { name: 'BBC' })
    ).not.toBeInTheDocument()
  })
  expect(
    screen.queryByRole('option', { name: 'Blue Frontier' })
  ).not.toBeInTheDocument()

  expect(
    screen.queryByRole('option', { name: 'Brandwatch' })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('option', { name: 'EngineerBetter' })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('option', { name: 'Equal Experts' })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('option', { name: 'Infobip' })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('option', { name: 'Synaptik Digital' })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('option', { name: 'Tata Consultancy services' })
  ).not.toBeInTheDocument()
})

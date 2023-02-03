import React from 'react'
import { render, screen } from '@testing-library/react'
import selectEvent from 'react-select-event'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EmployerDropDown from './EmployerDropDown'

describe('EmployerDropDown', () => {
  it('shows the label value and place holder value', async () => {
    render(
      <EmployerDropDown
        arrayList={[
          { name: 'Beamery', _id: 'Beamery' },
          { name: 'American Express', _id: 'American Express ' },
          { name: 'Capgemini', _id: 'Capgemini' }
        ]}
        onChange={() => {}}
        isEmpty={false}
      />
    )
    expect(screen.getByTestId('form-group')).toHaveTextContent(
      'Who is your employer? *'
    )
    expect(screen.getByTestId('form-group')).toHaveTextContent(
      'Type your employer name here'
    )
  })
  it('shows the selected value', async () => {
    render(
      <EmployerDropDown
        arrayList={[
          { name: 'Beamery', _id: 'Beamery' },
          { name: 'American Express ', _id: 'American Express ' },
          { name: 'Capgemini', _id: 'Capgemini' },
          { name: 'Carnall Farrar', _id: 'Carnall Farrar' }
        ]}
        onChange={() => {}}
        isEmpty={false}
      />
    )

    await selectEvent.select(
      screen.getByLabelText(/Who is your employer/i),
      'Capgemini'
    )
    expect(screen.getByTestId('form-group')).toHaveTextContent('Capgemini')
    expect(screen.getByTestId('form-group')).not.toHaveTextContent(
      'Carnall Farrar'
    )
  })
  it('shows the Options when typing', async () => {
    const user = userEvent.setup()
    render(
      <EmployerDropDown
        arrayList={[
          { name: 'Beamery', _id: 'Beamery' },
          { name: 'American Express ', _id: 'American Express ' },
          { name: 'Capgemini', _id: 'Capgemini' },
          { name: 'Capital', _id: 'Capital' }
        ]}
        onChange={() => {}}
        isEmpty={false}
      />,
      { hidden: true }
    )
    await user.type(screen.getByRole('combobox', { id: 'employer' }), 'cap')
    expect(screen.getByTestId('form-group')).toHaveTextContent('Capgemini')
    expect(screen.getByTestId('form-group')).toHaveTextContent('Capital')
    expect(screen.getByTestId('form-group')).not.toHaveTextContent('Beamery')
  })
  it('finds characters within words', async () => {
    const user = userEvent.setup()
    render(
      <EmployerDropDown
        arrayList={[
          { name: 'BBC', _id: 'BBC' },
          { name: 'Bet365', _id: 'Bet365' },
          { name: 'Blue Frontier', _id: 'Blue Frontier' },
          { name: 'EngineerBetter', _id: 'EngineerBetter' },
          { name: 'Brandwatch', _id: 'Brandwatch' },
          { name: 'Equal Experts', _id: 'Equal Experts' },
          { name: 'Infobip', _id: 'Infobip' },
          { name: 'Synaptik Digital', _id: 'Synaptik Digital' },
          {
            name: 'Tata Consultancy services',
            _id: 'Tata Consultancy services'
          },
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
        ]}
        employerOnChange={() => {}}
        isEmpty={false}
      />,
      { hidden: true }
    )
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
    const notAppearingApplicants = [
      'Alpha FX Group',
      'Anaplan',
      'BBC',
      'Bet365',
      'Brandwatch',
      'Blue Frontier',
      'EngineerBetter',
      'Equal Experts',
      'Infobip',
      'Tata Consultancy services',
      'Synaptik Digital'
    ]

    await user.type(screen.getByRole('combobox', { id: 'employer' }), 'am')

    appearingEmployers.forEach(employer =>
      expect(screen.getByTestId('form-group')).toHaveTextContent(employer)
    )
    notAppearingApplicants.forEach(employer =>
      expect(screen.getByTestId('form-group')).not.toHaveTextContent(employer)
    )
  })
})

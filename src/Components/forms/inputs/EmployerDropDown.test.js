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
        employerOnChange={() => {}}
        isEmpty={false}
      />
    )
    expect(screen.getByTestId('form-group')).toHaveTextContent(
      'Who is your employer?'
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
        employerOnChange={() => {}}
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
          { name: 'Capnga', _id: 'Capnga' }
        ]}
        employerOnChange={() => {}}
        isEmpty={false}
      />
    )
    await user.type(screen.getByRole('combobox', { id: 'employer' }), 'cap')
    expect(screen.getByTestId('form-group')).toHaveTextContent('Capgemini')
    expect(screen.getByTestId('form-group')).toHaveTextContent('Capnga')
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
      />
    )
    await user.type(screen.getByRole('combobox', { id: 'employer' }), 'am')
    expect(screen.getByTestId('form-group')).toHaveTextContent('Amazon')
    expect(screen.getByTestId('form-group')).toHaveTextContent(
      'Amazon Web Services (AWS)'
    )
    expect(screen.getByTestId('form-group')).toHaveTextContent(
      'American Express'
    )
    expect(screen.getByTestId('form-group')).toHaveTextContent('Beamery')
    expect(screen.getByTestId('form-group')).toHaveTextContent(
      'Blueprint Gaming'
    )
    expect(screen.getByTestId('form-group')).toHaveTextContent('EPAM System')
    expect(screen.getByTestId('form-group')).toHaveTextContent(
      'Inspired Gaming Group'
    )
    expect(screen.getByTestId('form-group')).toHaveTextContent('Tamarix Tech')
    expect(screen.getByTestId('form-group')).not.toHaveTextContent(
      'Alpha FX Group'
    )
    expect(screen.getByTestId('form-group')).not.toHaveTextContent('Anaplan')
    expect(screen.getByTestId('form-group')).not.toHaveTextContent('BBC')
    expect(screen.getByTestId('form-group')).not.toHaveTextContent('Bet365')
    expect(screen.getByTestId('form-group')).not.toHaveTextContent(
      'Blue Frontier'
    )
    expect(screen.getByTestId('form-group')).not.toHaveTextContent('Brandwatch')
    expect(screen.getByTestId('form-group')).not.toHaveTextContent(
      'EngineerBetter'
    )
    expect(screen.getByTestId('form-group')).not.toHaveTextContent(
      'Equal Experts'
    )
    expect(screen.getByTestId('form-group')).not.toHaveTextContent('Infobip')
    expect(screen.getByTestId('form-group')).not.toHaveTextContent(
      'Synaptik Digital'
    )
    expect(screen.getByTestId('form-group')).not.toHaveTextContent(
      'Tata Consultancy services'
    )
  })
})

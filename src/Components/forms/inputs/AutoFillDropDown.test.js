import '@testing-library/jest-dom' // this should go in ./src/setupTests.js
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import exampleData from '../data.json'
import AutoFillDropDown from './AutoFillDropDown'

describe('AutoFillDropDown', () => {
  describe('AutoFillDropDown', () => {
    it('shows a matching option for specific word', async () => {
      const user = userEvent.setup()
      render(
        <AutoFillDropDown
          arrayList={exampleData.employerList}
          employerOnChange={() => {}}
          isEmpty={false}
          label="Employer"
          name="employer"
        />
      )

      await user.type(
        screen.getByRole('textbox', { name: /employer/i }),
        'capgemini'
      )

      expect(
        screen.getByRole('option', { name: /capgemini/i })
      ).toBeInTheDocument()
    })
    expect(
      screen.queryByRole('option', { name: /Carnall Farrar/i })
    ).not.toBeInTheDocument()
  })
  it('finds characters within words', async () => {
    const user = userEvent.setup()
    render(
      <AutoFillDropDown
        arrayList={exampleData.employerList}
        employerOnChange={() => {}}
        isEmpty={false}
        name="employer"
        label="Employer"
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

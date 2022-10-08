// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************//
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('fillInitialForm', data => {
  // mandatory fields
  cy.findByRole('textbox', { name: /first name/i }).type(data.firstName)
  cy.findByRole('textbox', { name: /last name/i }).type(data.lastName)
  cy.findByRole('combobox', { name: /city/i }).select(data.cityName)
  cy.findByRole('textbox', { name: /email/i }).type(data.email)
  cy.findByRole('textbox', { name: /phone number/i }).type(data.tel)
  cy.findByRole('textbox', { name: /interested in volunteering/i }).type(
    data.interestedInVolunteer
  )
  cy.findByRole('textbox', { name: /interested in code your future/i }).type(
    data.interestedInCYF
  )

  // optional fields
  if (data.industry) {
    cy.findByRole('combobox', { name: /industry/i }).select(data.industry)
  }
  if (data.hearAboutCYF) {
    cy.findByRole('combobox', { name: /hear about code your future/i }).select(
      data.hearAboutCYF
    )
  }

  // submission
  cy.findByRole('checkbox', { name: /terms of use/i }).check()
  cy.findByRole('checkbox', { name: /contact me/i }).check()
  cy.findByRole('button', { name: /submit/i }).click()
})

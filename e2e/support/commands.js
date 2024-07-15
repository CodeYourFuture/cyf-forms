// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************//
import '@testing-library/cypress/add-commands'
const mockServerURL = 'http://localhost:3001'

Cypress.Commands.add('login', token => {
  cy.visit('/')
  cy.intercept('POST', `${mockServerURL}/volunteer/login`, req => {
    req.reply({ token })
  }).as('login')

  cy.findByRole('textbox', { name: /email/i }).type('jane@codeyourfuture.io')
  cy.findByRole('button', { name: /submit/i }).click()
  cy.wait('@login')

  cy.findByText(/Please check your email/i).should('exist')
  cy.visit(`${Cypress.config('baseUrl')}/log-in/${token}`)
})

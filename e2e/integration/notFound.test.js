it('shows a 404 page', () => {
  cy.visit('/some-random-page')
  cy.findByText(/the page you are looking for does not exist/i).should('exist')
})

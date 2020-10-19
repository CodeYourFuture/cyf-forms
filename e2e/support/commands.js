// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************//

Cypress.Commands.add('fillInitialForm', data => {
  // mandatory fields
  cy.get('[name="firstName"]').type(data.firstName)
  cy.get('[name="lastName"]').type(data.lastName)
  cy.get('[name="cityId"]').select(data.cityName)
  cy.get('[name="email"]').type(data.email)
  cy.get('input[type="tel"]').type(data.tel)
  cy.get('[name="interestedInVolunteer"]').type(data.interestedInVolunteer)
  cy.get('[name="interestedInCYF"]').type(data.interestedInCYF)

  // optional fields
  if (data.industry) {
    cy.get('[name="industry"]').select(data.industry)
  }
  if (data.hearAboutCYF) {
    cy.get('[name="hearAboutCYF"]').select(data.hearAboutCYF)
  }

  // submission
  cy.get('[name="agreeToTOU"]').check()
  cy.get('[name="agreeToReceiveCommunication"]').check()
  cy.get('button')
    .contains('Submit')
    .click()
})

Cypress.Commands.add('fillCodeForm', (data, button) => {
  Object.keys(data.codeExpertise).forEach(area => {
    const level = parseInt(data.codeExpertise[area])
    cy.get(`[name="codeExpertise['${area}']"]`)
      .eq(level - 1)
      .check()
  })
  if (data.otherCodeExpertise) {
    cy.get('[name="otherCodeExpertise"]').type(data.otherCodeExpertise)
  }
  if (data.availableOnWeekends) {
    const index = ['Yes', 'No'].indexOf(data.availableOnWeekends)
    cy.get('[name="availableOnWeekends"]')
      .eq(index)
      .check()
  }
  cy.get('button')
    .contains(button)
    .click()
})

Cypress.Commands.add('fillOrgForm', (data, button) => {
  Object.keys(data.skillSets).forEach(skill => {
    cy.get(`[name="skillSets[${skill}]"]`).check()
  })
  Object.keys(data.availability).forEach(slot => {
    cy.get(`[name="availability[${slot}]"]`).check()
  })
  cy.get('button')
    .contains(button)
    .click()
})

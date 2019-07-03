// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************//

Cypress.Commands.add("fillInitialForm", (data, button) => {
    cy.get('[name="firstName"]').type(data.firstName);
    cy.get('[name="lastName"]').type(data.lastName);
    cy.get('[name="city"]').select(data.city);
    cy.get('[name="email"]').type(data.email);
    cy.get('[name="phone"]').type(data.phone);
    Object.keys(data.interests).forEach((field) => {
        cy.get(`[name="interests[${field}]"]`).check();
    });
    cy.get('button').contains(button).click();
});

Cypress.Commands.add("fillCodeForm", (data, button) => {
    Object.keys(data.codeExpertise).forEach(area => {
        const level = parseInt(data.codeExpertise[area]);
        cy.get(`[name="codeExpertise['${area}']"]`).eq(level - 1).check();
    });
    if (data.otherCodeExpertise) {
        cy.get('[name="otherCodeExpertise"]').type(data.otherCodeExpertise);
    }
    if (data.availableOnWeekends) {
        const index = ["Yes", "No"].indexOf(data.availableOnWeekends);
        cy.get('[name="availableOnWeekends"]').eq(index).check();
    }
    cy.get('button').contains(button).click();
});

Cypress.Commands.add("fillOrgForm", (data, button) => {
    Object.keys(data.skillSets).forEach(skill => {
        cy.get(`[name="skillSets[${skill}]"]`).check();
    });
    Object.keys(data.availability).forEach(slot => {
       cy.get(`[name="availability[${slot}]"]`).check();
    });
    cy.get('button').contains(button).click();
});

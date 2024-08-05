const mockServerURL = 'http://localhost:3001'

beforeEach(() => {
  cy.intercept('GET', `${mockServerURL}/cities?visibleIn=VOLUNTEER_FORM`, {
    fixture: 'cities.json'
  })
  cy.intercept('GET', `${mockServerURL}/teams`, {
    fixture: 'teams.json'
  })
  cy.intercept('GET', `${mockServerURL}/employers`, {
    fixture: 'teams.json'
  })
  cy.task('generateToken', {
    claims: { email: 'foo@bar.org' },
    algo: 'HS256'
  }).then(token => cy.login(token))
})

it('shows success message', () => {
  cy.visit('/code/foobar/success')
  cy.findByText(/we will review your application/i).should('exist')
})

it('includes the user ID when resubmitting', () => {
  const userId = 'something'
  const code = 'does-this-matter'
  cy.intercept('POST', `${mockServerURL}/volunteer`, req => {
    req.reply({ volunteer: { _id: 'some-new-id', ...req.body } })
  }).as('createVolunteer')
  cy.visit(`/code/${userId}/${code}`)

  cy.findByRole('textbox', { name: /first name/i }).type('Erhard')
  cy.findByRole('textbox', { name: /last name/i }).type('Hennemann')
  cy.findByRole('combobox', { name: /city/i }).select('London')
  cy.findByRole('combobox', {
    name: /select the team you want to volunteer for/i
  }).select('Education')
  cy.findByRole('textbox', { name: /phone number/i }).type('0158-8969905')
  cy.findByRole('textbox', { name: /interested in volunteering/i }).type('just')
  cy.findByRole('textbox', { name: /interested in code your future/i }).type(
    'testing'
  )
  cy.findByRole('checkbox', { name: /terms of use/i }).check()
  cy.findByRole('checkbox', { name: /contact me/i }).check()
  cy.findByRole('button', { name: /submit/i }).click()

  cy.wait('@createVolunteer').then(({ request: { body: payload } }) => {
    expect(payload).to.have.property('userId', userId)
  })
})

it('lets you request a reminder email', () => {
  // cy.login(token)
  cy.intercept('POST', `${mockServerURL}/volunteer/email/verification`, {
    statusCode: 200
  }).as('verifyEmail')
  const userId = 'whoever'
  const code = 'whatever'
  const email = 'foo@bar.org'
  cy.visit(`/code/${userId}/${code}`)

  cy.findByText(/you have been re-directed to fill in this form/i).should(
    'exist'
  )
  // TODO why is this a clickable span?!
  cy.findByText('here').click()
  // TODO not accessible by label
  cy.findByRole('button', { name: /submit/i }).click()

  cy.wait('@verifyEmail').then(({ request: { body: payload } }) => {
    expect(payload).to.deep.equal({ email, userId })
  })
})

it('lets you revalidate on failure', () => {
  cy.visit('/code/user/failed')
  cy.findByText(/failed to verify your email address/i).should('exist')
})

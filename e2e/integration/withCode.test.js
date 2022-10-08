const mockServerURL = 'http://localhost:3001'

beforeEach(() => {
  cy.request('POST', `${mockServerURL}/_reset`)
})

it('shows success message', () => {
  cy.visit('/code/foobar/success')
  cy.findByText(/we will review your application/i).should('exist')
})

it('includes the user ID when resubmitting', () => {
  const userId = 'something'
  const code = 'does-this-matter'
  cy.visit(`/code/${userId}/${code}`)

  cy.findByRole('textbox', { name: /first name/i }).type('Erhard')
  cy.findByRole('textbox', { name: /last name/i }).type('Hennemann')
  cy.findByRole('combobox', { name: /city/i }).select('London')
  cy.findByRole('textbox', { name: /email/i }).type(
    'erhard.hennemann@example.com'
  )
  cy.findByRole('textbox', { name: /phone number/i }).type('0158-8969905')
  cy.findByRole('textbox', { name: /interested in volunteering/i }).type('just')
  cy.findByRole('textbox', { name: /interested in code your future/i }).type(
    'testing'
  )
  cy.findByRole('checkbox', { name: /terms of use/i }).check()
  cy.findByRole('checkbox', { name: /contact me/i }).check()
  cy.findByRole('button', { name: /submit/i }).click()

  cy.request(`${mockServerURL}/_calls`).then(({ body }) => {
    expect(body).to.have.length(1)
    const [{ body: payload, method, path }] = body
    expect(method).to.equal('POST')
    expect(path).to.equal('/volunteer')
    expect(payload).to.have.property('userId', userId)
  })
})

it('lets you request a reminder email', () => {
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
  cy.findByRole('textbox').type(email)
  cy.findByRole('button', { name: /submit/i }).click()
  cy.request(`${mockServerURL}/_calls`).then(({ body }) => {
    expect(body).to.have.length(1)
    const [{ body: payload, method, path }] = body
    expect(method).to.equal('POST')
    expect(path).to.equal('/volunteer/email/verification')
    expect(payload).to.deep.equal({ email, userId })
  })
})

it('lets you revalidate on failure', () => {
  cy.visit('/code/user/failed')
  cy.findByText(/failed to verify your email address/i).should('exist')
})

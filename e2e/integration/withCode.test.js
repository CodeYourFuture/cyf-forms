const mockServerURL = 'http://localhost:3001'

beforeEach(() => {
  cy.request('POST', `${mockServerURL}/_reset`)
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

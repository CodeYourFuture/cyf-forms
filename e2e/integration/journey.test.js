const mockServerURL = 'http://localhost:3001'

beforeEach(() => {
  cy.request('POST', `${mockServerURL}/_reset`)

  cy.visit('/')
})

it('can submit a minimal form', () => {
  const initialData = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@morgue.org',
    tel: '01189998819991197253',
    interestedInVolunteer: 'just sounds interesting',
    interestedInCYF: 'trying to do my bit',
    industry: 'Education',
    hearAboutCYF: 'Social media'
  }

  cy.findByRole('textbox', { name: /first name/i }).type(initialData.firstName)
  cy.findByRole('textbox', { name: /last name/i }).type(initialData.lastName)
  cy.findByRole('combobox', { name: /city/i }).select('London')
  cy.findByRole('textbox', { name: /email/i }).type(initialData.email)
  cy.findByRole('textbox', { name: /phone number/i }).type(initialData.tel)
  cy.findByRole('textbox', { name: /interested in volunteering/i }).type(
    initialData.interestedInVolunteer
  )
  cy.findByRole('textbox', { name: /interested in code your future/i }).type(
    initialData.interestedInCYF
  )

  // optional fields
  cy.findByRole('combobox', { name: /industry/i }).select(initialData.industry)
  cy.findByRole('combobox', { name: /hear about code your future/i }).select(
    initialData.hearAboutCYF
  )

  // submission
  cy.findByRole('checkbox', { name: /terms of use/i }).check()
  cy.findByRole('checkbox', { name: /contact me/i }).check()
  cy.findByRole('button', { name: /submit/i }).click()

  cy.request(`${mockServerURL}/_calls`).then(response => {
    const [{ body: payload, method, path }] = response.body
    expect(method).to.equal('POST')
    expect(path).to.equal('/volunteer')
    expect(payload).to.deep.eq({
      ...initialData,
      agreeToReceiveCommunication: true,
      agreeToTOU: true,
      guidePeople: [],
      cityId: '123abc',
      employer: '',
      otherSkill: [],
      techSkill: [],
      tel: `+${initialData.tel}`,
      userId: ''
    })
  })
  cy.findByText(
    `Welcome ${initialData.firstName} ${initialData.lastName}`
  ).should('exist')
  cy.findByText(/thank you for submitting your application/i).should('exist')
})

it('requires employee selection', () => {
  cy.findByRole('textbox', { name: /first name/i }).type('Laura')
  cy.findByRole('textbox', { name: /last name/i }).type('Olsen')
  cy.findByRole('combobox', { name: /city/i }).select('London')
  cy.findByRole('textbox', { name: /email/i }).type('laura.olsen@example.com')
  cy.findByRole('textbox', { name: /phone number/i }).type('96838503')
  cy.findByRole('textbox', { name: /interested in volunteering/i }).type('just')
  cy.findByRole('textbox', { name: /interested in code your future/i }).type(
    'testing'
  )
  cy.findByRole('checkbox', { name: /terms of use/i }).check()
  cy.findByRole('checkbox', { name: /contact me/i }).check()

  cy.findByRole('combobox', { name: /hear about code your future/i }).select(
    'Employer'
  )
  cy.findByRole('button', { name: /submit/i }).click()
  cy.findByText(/form is incomplete/i).should('exist')

  cy.findByRole('combobox', { name: /who is your employer/i }).select(
    'Capgemini'
  )
  cy.findByRole('button', { name: /submit/i }).click()

  cy.request(`${mockServerURL}/_calls`).then(({ body }) => {
    expect(body).to.have.length(1)
    const [{ body: payload }] = body
    expect(payload).to.have.property('hearAboutCYF', 'Employer')
    expect(payload).to.have.property('employer', 'Capgemini')
  })
})

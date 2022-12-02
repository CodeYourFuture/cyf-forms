const mockServerURL = 'http://localhost:3001'

beforeEach(() => {
  cy.intercept('GET', `${mockServerURL}/cities?visibleIn=VOLUNTEER_FORM`, {
    fixture: 'cities.json'
  })
  cy.visit('/')
})

it('can submit a minimal form', () => {
  cy.intercept('POST', `${mockServerURL}/volunteer`, req => {
    req.reply({ volunteer: { _id: 'some-new-id', ...req.body } })
  }).as('createVolunteer')
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
  setExperience('public speaking', 'None')
  setExperience('node', 'Some')
  setExperience('react', 'Professional experience')
  setExperience('blogging', 'Some')

  // submission
  cy.findByRole('checkbox', { name: /terms of use/i }).check()
  cy.findByRole('checkbox', { name: /contact me/i }).check()
  cy.findByRole('button', { name: /submit/i }).click()

  cy.wait('@createVolunteer').then(({ request: { body: payload } }) => {
    expect(payload).to.deep.include({
      ...initialData,
      agreeToReceiveCommunication: true,
      agreeToTOU: true,
      cityId: '123abc',
      employer: '',
      tel: `+${initialData.tel}`,
      userId: ''
    })
    expect(payload.guidePeople).to.deep.include({
      id: '09u03uifnc',
      label: 'Help people learn public speaking',
      level: 'None',
      name: 'Help people learn public speaking'
    })
    expect(payload.otherSkill).to.deep.include({
      id: '8hyuhe22uhh',
      label: 'Blogging / Writing',
      level: 'Some',
      name: 'Blogging / Writing'
    })
    expect(payload.techSkill).to.deep.include({
      id: '8976tygsbhj3e',
      label: 'NodeJS',
      level: 'Some',
      name: 'NodeJS'
    })
    expect(payload.techSkill).to.deep.include({
      id: '23edcs3h3j3',
      label: 'ReactJS',
      level: 'Professional experience',
      name: 'ReactJS'
    })
  })
  cy.findByText(
    `Welcome ${initialData.firstName} ${initialData.lastName}`
  ).should('exist')
  cy.findByText(/thank you for submitting your application/i).should('exist')
})

it('requires employee selection', () => {
  cy.intercept('POST', `${mockServerURL}/volunteer`, req => {
    req.reply({ volunteer: { _id: 'some-new-id', ...req.body } })
  }).as('createVolunteer')

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

  cy.wait('@createVolunteer').then(({ request: { body: payload } }) => {
    expect(payload).to.have.property('hearAboutCYF', 'Employer')
    expect(payload).to.have.property('employer', 'Capgemini')
  })
})

const setExperience = (topic, level) => {
  cy.findByRole('checkbox', { name: new RegExp(topic, 'i') })
    .check()
    .parents('.form-table')
    .within(() => {
      cy.findByRole('radio', { name: new RegExp(level, 'i') }).check()
    })
}

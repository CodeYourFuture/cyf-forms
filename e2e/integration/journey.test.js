const mockServerURL = `http://localhost:3001`

const timestamp = 1559822173490

const initialData = {
  firstName: 'Jane',
  lastName: 'Doe',
  cityName: 'London',
  email: 'jane.doe@morgue.org',
  tel: '01189998819991197253',
  interestedInVolunteer: 'just sounds interesting',
  interestedInCYF: 'trying to do my bit',
  industry: 'Education',
  hearAboutCYF: 'Social media',
  agreeToReceiveCommunication: false,
  agreeToTOU: false
}

beforeEach(() => {
  cy.request('POST', `${mockServerURL}/_reset`)
  cy.clock(timestamp)

  cy.visit('/')
})

const generateExpected = data => ({
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  tel: `+${data.tel}`,
  cityId: '123abc',
  interestedInVolunteer: data.interestedInVolunteer,
  interestedInCYF: data.interestedInCYF,
  industry: data.industry || '',
  hearAboutCYF: data.hearAboutCYF || '',
  guidePeople: data.guidePeople || [],
  techSkill: data.techSkill || [],
  otherSkill: data.otherSkill || [],
  userId: '',
  agreeToReceiveCommunication: true,
  agreeToTOU: true
})

it('can submit a minimal form', () => {
  cy.fillInitialForm(initialData)

  cy.request(`${mockServerURL}/_calls`).then(response => {
    expect(response.body[0].body).to.deep.eq(generateExpected(initialData))
  })
})

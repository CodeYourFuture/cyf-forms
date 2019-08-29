const guidePeopleSkillList = [
  {
    name: '',
    level: '',
    label: 'Coaching / Mentoring'
  },
  { name: '', level: '', label: 'Public Speaking' }
]
const techSkillList = [
  {
    name: '',
    level: '',
    label: 'NodeJS'
  },
  { name: '', level: '', label: 'ReactJS' },
  { name: '', level: '', label: 'Databases' },
  { name: '', level: '', label: 'JavaScript' },
  { name: '', level: '', label: 'HTML, CSS ' },
  { name: '', level: '', label: 'UX Design' },
  { name: '', level: '', label: 'Other' }
]
const otherSkillList = [
  { name: '', level: '', label: 'Blogging / Writing' },
  {
    name: '',
    level: '',
    label: 'Photography / Videography'
  },
  {
    name: '',
    level: '',
    label: 'Growth Marketing / Social Media Strategy'
  },
  {
    name: '',
    level: '',
    label: 'Speaking to NGOs and corporate partners '
  },
  {
    name: '',
    level: '',
    label: 'Accounting / Bookkeeping'
  },
  { name: '', level: '', label: 'Business Analysis', id: 'BusinessAnalysis' },
  {
    name: '',
    level: '',
    label: 'Project Management '
  },
  {
    name: '',
    level: '',
    label: 'Help with job search / CV & interview prep'
  },
  { name: '', level: '', label: 'Running events', id: 'RunningEvents' },
  {
    name: '',
    level: '',
    label: 'Pedagogy / Learning Environments'
  }
]
export const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  city: '',
  tel: '',
  cityId: '',
  interestedInVolunteer: '',
  interestedInCYF: '',
  industry: '',
  hearAboutCYF: '',
  guidePeople: guidePeopleSkillList,
  techSkill: techSkillList,
  otherSkill: otherSkillList,
  submitted: false,
  err: null,
  msg: null,
  errors: {
    firstName: false,
    lastName: false,
    email: false,
    city: false,
    tel: false,
    cityId: false,
    interestedInVolunteer: false,
    interestedInCYF: false,
    industry: false,
    hearAboutCYF: false
  }
}

export const skillSets = [
  'coaching',
  'journalism',
  'photography',
  'marketing',
  'partnerships',
  'accounting',
  'community',
  'projectManagement',
  'placement',
  'events',
  'wellbeing',
  'pedagogy'
]
export const industryList = [
  { name: 'one', _id: 'one' },
  { name: 'two', _id: 'two' },
  { name: 'tree', _id: 'tree' }
]
export const hearAboutCYFList = [
  { name: 'one', _id: 'one' },
  { name: 'two', _id: 'two' },
  { name: 'tree', _id: 'tree' }
]

export const radioButtonList = [
  { value: 'none', _id: 'none' },
  { value: 'some', _id: 'some' },
  { value: 'partOfAJob', _id: 'partOfAJob' }
]

import moment from 'moment'

export const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  city: '',
  tel: '',
  cityId: '',
  submitted: false,
  err: null,
  msg: null,
  errors: {
    firstName: false,
    lastName: false,
    email: false,
    city: false,
    tel: false,
    cityId: false
  }
}

export const getAgeFromBirthday = birthday => {
  if (birthday) {
    const date = moment(birthday).format('DD/MM/YYYY')
    const totalMonths = moment().diff(date, 'months')
    // eslint-disable-next-line radix
    const years = parseInt(totalMonths / 12)
    const months = totalMonths % 12
    if (months !== 0) {
      return parseFloat(`${years}.${months}`)
    }
    return years
  }
  return null
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

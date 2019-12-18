import ListsData from './data.json'
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
  guidePeople: ListsData.guidePeopleSkillList,
  techSkill: ListsData.techSkillList,
  otherSkill: ListsData.otherSkillList,
  submitted: false,
  err: null,
  msg: null,
  valuationError: false,
  acknowledgement: false,
  formInComplete: false,
  userId: '',
  dashboardUrl: '',
  agreeToTOU: false,
  agreeToReceiveCommunication: false,
  errors: {
    firstName: false,
    lastName: false,
    email: false,
    city: false,
    cityId: false,
    interestedInVolunteer: false,
    interestedInCYF: false,
    agreeToTOU: false,
    agreeToReceiveCommunication: false
  }
}

export const arrayOnChange = (e, array) => {
  let newArray
  const { checked, value, name, type } = e.target
  newArray = array.map(item => {
    if (name === item.label) {
      if (type === 'checkbox') {
        return {
          name: checked ? name : '',
          level: checked ? item.level : '',
          label: item.label,
          id: item.id
        }
      }
      if (type === 'radio') {
        return {
          name: checked ? name : '',
          level: checked ? value : '',
          label: item.label,
          id: item.id
        }
      } else {
        return {
          name: name,
          level: value,
          label: item.label,
          id: item.id
        }
      }
    } else return item
  })
  return newArray
}

export const filterEmptyValue = values => {
  return values.filter(value => value.name !== '')
}

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
  teamId: '',
  hearAboutCYFFromEmployer: false,
  employer: '',
  guidePeople: ListsData.guidePeopleSkillList,
  techSkill: ListsData.techSkillList,
  otherSkill: ListsData.otherSkillList,
  submitted: false,
  err: null,
  msg: null,
  acknowledgement: false,
  formInComplete: false,
  userId: '',
  dashboardUrl: '',
  agreeToTOU: false,
  agreeToReceiveCommunication: false,
  showFindAccountBox: false,
  loading: false,
  errors: {
    firstName: false,
    lastName: false,
    email: false,
    city: false,
    cityId: false,
    teamId: false,
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

export const filterForCheckedItems = items => {
  return items.filter(item => item.name !== '')
}

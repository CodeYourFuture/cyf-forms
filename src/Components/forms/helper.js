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
    hearAboutCYF: false,
    acknowledgement: false
  }
}

export const arrayOnChange = (e, array) => {
  let newArray
  const { checked, value, name } = e.target
  const nValue = value.split('-')
  newArray = array.map(item => {
    if (name === item.label) {
      if (nValue[0] === 'checkBox') {
        return {
          name: checked ? name : '',
          level: checked ? item.level : '',
          label: item.label,
          id: item.id
        }
      }
      if (nValue[0] === 'radioButton') {
        return {
          name: checked ? name : '',
          level: checked ? nValue[1] : '',
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

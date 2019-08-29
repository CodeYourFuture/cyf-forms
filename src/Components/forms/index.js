import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCities, createUserHandler } from '../../Redux/action'
import { initialState } from './helper'
import Inputs from './inputs'
import './index.css'
class Forms extends Component {
  state = initialState

  // UNSAFE_componentWillMount() {
  //   this.props.loadCities()
  // }

  // componentWillReceiveProps(newProps) {
  //   // console.log(newProps)
  // }

  telOnChange = tel => {
    const { errors } = this.state
    errors[`${'tel'}`] = false
    this.setState({ tel, errors, submitted: false })
  }

  onChange = e => {
    const { name, value } = e.target
    const { errors } = this.state
    errors[name] = false
    if (e && e.target) {
      this.setState({
        [name]: value,
        submitted: false,
        errors
      })
    }
  }

  validateForm = values => {
    const { errors } = this.state
    const formInputs = Object.keys(values)
    const validated = formInputs.map(key => {
      if (!values[key]) {
        errors[key] = true
        return true
      }
      errors[key] = false
      return false
    })
    this.setState({ errors })
    return validated
  }

  userHandleSubmit = async e => {
    e.preventDefault()
    this.setState({ submitted: true })
    const {
      firstName,
      lastName,
      email,
      tel,
      cityId,
      interestedInVolunteer,
      interestedInCYF,
      industry,
      hearAboutCYF
    } = this.state
    const validatedInputs = this.validateForm({
      firstName,
      lastName,
      email,
      tel,
      cityId,
      interestedInVolunteer,
      interestedInCYF,
      industry,
      hearAboutCYF
    })
    const emptyValues = validatedInputs.includes(true)
    if (!emptyValues) {
      this.props.createUserHandler({
        firstName,
        lastName,
        email,
        tel,
        cityId,
        interestedInVolunteer,
        interestedInCYF,
        industry,
        hearAboutCYF
      })
    }
  }

  dateOfBirthOnChange = dateOfBirth => {
    this.setState({
      dateOfBirth
    })
  }
  onChangeCheckList = e => {
    var newGuidePeople
    const { checked, value, name } = e.target
    const nValue = value.split('-')
    const { guidePeople } = this.state
    newGuidePeople = guidePeople.map(guidePeopleItem => {
      if (name === guidePeopleItem.label) {
        if (nValue[0] === 'checkBox') {
          return {
            name: checked ? name : '',
            level: checked ? guidePeopleItem.level : '',
            label: guidePeopleItem.label,
            id: guidePeopleItem.id
          }
        }
        if (nValue[0] === 'radioButton') {
          return {
            name: checked ? name : '',
            level: checked ? nValue[1] : '',
            label: guidePeopleItem.label,
            id: guidePeopleItem.id
          }
        } else {
          return {
            name: name,
            level: value,
            label: guidePeopleItem.label,
            id: guidePeopleItem.id
          }
        }
      } else return guidePeopleItem
    })
    this.setState({ guidePeople: newGuidePeople })
  }

  onChangeTechSkill = e => {
    var newTechSkill
    const { checked, value, name } = e.target
    const nValue = value.split('-')
    const { techSkill } = this.state
    newTechSkill = techSkill.map(techSkillItem => {
      if (name === techSkillItem.label) {
        if (nValue[0] === 'checkBox') {
          return {
            name: checked ? name : '',
            level: checked ? techSkillItem.level : '',
            label: techSkillItem.label,
            id: techSkillItem.id
          }
        }
        if (nValue[0] === 'radioButton') {
          return {
            name: checked ? name : '',
            level: checked ? nValue[1] : '',
            label: techSkillItem.label,
            id: techSkillItem.id
          }
        } else {
          return {
            name: name,
            level: value,
            label: techSkillItem.label,
            id: techSkillItem.id
          }
        }
      } else return techSkillItem
    })
    this.setState({ techSkill: newTechSkill })
  }

  onChangeOtherSkill = e => {
    var newOtherSkill
    const { checked, value, name } = e.target
    const nValue = value.split('-')
    const { otherSkill } = this.state
    newOtherSkill = otherSkill.map(otherSkillItem => {
      if (name === otherSkillItem.label) {
        if (nValue[0] === 'checkBox') {
          return {
            name: checked ? name : '',
            level: checked ? otherSkillItem.level : '',
            label: otherSkillItem.label,
            id: otherSkillItem.id
          }
        }
        if (nValue[0] === 'radioButton') {
          return {
            name: checked ? name : '',
            level: checked ? nValue[1] : '',
            label: otherSkillItem.label,
            id: otherSkillItem.id
          }
        } else {
          return {
            name: name,
            level: value,
            label: otherSkillItem.label,
            id: otherSkillItem.id
          }
        }
      } else return otherSkillItem
    })
    this.setState({ otherSkill: newOtherSkill })
  }

  render() {
    const { err } = this.props
    const { disabled } = this.state
    return (
      <div className="form-container container">
        <div className="sign-in">
          <h1 className="form-header">
            Code Your Future volunteer application form
          </h1>
          <p className="form-description">
            Thank you for your interest. In order to ensure we’re a great fit,
            please complete the form below:
          </p>
          {err && (
            <p className="error">
              {err}
              {window.scrollTo(0, 0)}
            </p>
          )}
          <form className="mb-4" onSubmit={this.userHandleSubmit} method="post">
            <Inputs
              {...this.props}
              {...this.state}
              dateOfBirthOnChange={this.dateOfBirthOnChange}
              userHandleSubmit={this.userHandleSubmit}
              onChange={this.onChange}
              telOnChange={this.telOnChange}
              onChangeCheckList={this.onChangeCheckList}
              onChangeTechSkill={this.onChangeTechSkill}
              onChangeOtherSkill={this.onChangeOtherSkill}
            />
            <button
              disabled={disabled}
              className="btn sign-up-btn"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export function mapStateToProps(store) {
  const { cities, volunteer } = store
  return {
    cities: cities.cities && cities.cities,
    user: volunteer && volunteer.user,
    err: volunteer && volunteer.err
  }
}
export default connect(
  mapStateToProps,
  { loadCities, createUserHandler }
)(Forms)

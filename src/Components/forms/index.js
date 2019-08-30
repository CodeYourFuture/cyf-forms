import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCities, createVolunteerHandler } from '../../Redux/action'
import { initialState, arrayOnchange, filterEmptyValue } from './helper'
import Inputs from './inputs'
import Acknowledgement from './Acknowledgement'
import './index.css'
class Forms extends Component {
  state = initialState

  UNSAFE_componentWillMount() {
    this.props.loadCities()
  }

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
  onChangeAcknowledgement = e => {
    const { name, checked } = e.target
    const { errors } = this.state
    errors[name] = false
    if (e && e.target) {
      this.setState({
        [name]: checked,
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

  validateArray = values => {
    Object.keys(values).map(value => {
      const newValue = values[value].map(item => {
        if (item.name !== '' && item.level === '') {
          this.setState({ valuationError: true })
          return {
            id: item.id,
            name: item.name,
            level: "It's empty",
            label: item.label
          }
        } else return item
      })
      return this.setState({ [value]: newValue })
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ submitted: true, valuationError: false })
    const {
      firstName,
      lastName,
      email,
      tel,
      cityId,
      interestedInVolunteer,
      interestedInCYF,
      industry,
      hearAboutCYF,
      guidePeople,
      techSkill,
      otherSkill,
      valuationError,
      acknowledgement
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
      hearAboutCYF,
      acknowledgement
    })
    this.validateArray({ guidePeople, techSkill, otherSkill })
    const emptyValues = validatedInputs.includes(true)
    if (!emptyValues && !valuationError) {
      this.props.createVolunteerHandler({
        firstName,
        lastName,
        email,
        tel,
        cityId,
        interestedInVolunteer,
        interestedInCYF,
        industry,
        hearAboutCYF,
        guidePeople: filterEmptyValue(guidePeople),
        techSkill: filterEmptyValue(techSkill),
        otherSkill: filterEmptyValue(otherSkill)
      })
    }
  }

  onChangeCheckList = e => {
    const { guidePeople } = this.state
    var newGuidePeople = arrayOnchange(e, guidePeople)
    this.setState({ guidePeople: newGuidePeople })
  }

  onChangeTechSkill = e => {
    const { techSkill } = this.state
    var newTechSkill = arrayOnchange(e, techSkill)
    this.setState({ techSkill: newTechSkill })
  }

  onChangeOtherSkill = e => {
    const { otherSkill } = this.state
    var newOtherSkill = arrayOnchange(e, otherSkill)
    this.setState({ otherSkill: newOtherSkill })
  }

  render() {
    const { err } = this.props
    const { disabled } = this.state
    return (
      <div className="form-container container">
        <div className="sign-in">
          <span className="form-header">
            Code Your Future volunteer application form
          </span>
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
          <form className="mb-4" onSubmit={this.handleSubmit} method="post">
            <Inputs
              {...this.props}
              {...this.state}
              onChange={this.onChange}
              telOnChange={this.telOnChange}
              onChangeCheckList={this.onChangeCheckList}
              onChangeTechSkill={this.onChangeTechSkill}
              onChangeOtherSkill={this.onChangeOtherSkill}
            />
            <Acknowledgement
              onChange={this.onChangeAcknowledgement}
              checked={this.state.acknowledgement}
              isEmpty={this.state.errors.acknowledgement}
            />
            <button
              disabled={disabled}
              className="btn volunteer-submit-btn"
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
    volunteer: volunteer && volunteer.volunteer,
    err: volunteer && volunteer.err
  }
}
export default connect(
  mapStateToProps,
  { loadCities, createVolunteerHandler }
)(Forms)

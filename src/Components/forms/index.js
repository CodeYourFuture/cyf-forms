import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCities, createVolunteerHandler } from '../../Redux/action'
import { initialState, arrayOnChange, filterEmptyValue } from './helper'
import Header from './header'
import Inputs from './inputs'
import Acknowledgement from './Acknowledgement'
import './index.css'
class Forms extends Component {
  state = initialState

  UNSAFE_componentWillMount() {
    this.props.loadCities()
  }

  telOnChange = tel => {
    const { errors } = this.state
    errors[`${'tel'}`] = false
    this.setState({ tel, errors, submitted: false })
  }

  onChange = e => {
    const { name, value, type, checked } = e.target
    const { errors } = this.state
    errors[name] = false
    if (e && e.target) {
      this.setState({
        [name]: type === 'checkbox' ? checked : value,
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
        if (
          (item.name !== '' && item.level === '') ||
          item.level === "It's empty"
        ) {
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
      cityId,
      interestedInVolunteer,
      interestedInCYF,
      acknowledgement
    })
    await this.validateArray({ guidePeople, techSkill, otherSkill })
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

  onChangeCheckList = (e, name) => {
    const { guidePeople, techSkill, otherSkill } = this.state
    switch (name) {
      case 'guidePeople':
        let newGuidePeople = arrayOnChange(e, guidePeople)
        return this.setState({ guidePeople: newGuidePeople })
      case 'techSkill':
        let newTechSkill = arrayOnChange(e, techSkill)
        return this.setState({ techSkill: newTechSkill })
      case 'otherSkill':
        let newOtherSkill = arrayOnChange(e, otherSkill)
        return this.setState({ otherSkill: newOtherSkill })
      default:
        return ''
    }
  }

  render() {
    const { err, volunteer } = this.props
    const { disabled, acknowledgement } = this.state
    if (volunteer && volunteer._id) {
      return (
        <div className="form-container container p-4">
          <h4>
            Welcome {volunteer.firstName} {volunteer.lastName}
          </h4>
          <p>CODE YOUR FUTURE will contact as soon as possible.</p>
        </div>
      )
    }
    return (
      <div className="form-container container">
        <div>
          <Header err={err} />
          <form className="mb-4" onSubmit={this.handleSubmit} method="post">
            <Inputs
              {...this.props}
              {...this.state}
              onChange={this.onChange}
              telOnChange={this.telOnChange}
              onChangeCheckList={this.onChangeCheckList}
            />
            <Acknowledgement
              onChange={this.onChange}
              checked={this.state.acknowledgement}
              isEmpty={this.state.errors.acknowledgement}
            />
            <button
              className="btn volunteer-submit-btn"
              type="submit"
              disabled={disabled || !acknowledgement}
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

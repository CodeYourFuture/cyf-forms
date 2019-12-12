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
    const dashboardUrl = this.props.location.search
    const { userId } = this.props.match.params
    if (userId) {
      this.setState({ userId, dashboardUrl: dashboardUrl.slice(1) })
    }
    this.props.loadCities()
  }

  telOnChange = tel => {
    const { errors } = this.state
    errors[`${'tel'}`] = false
    this.setState({ tel, errors, submitted: false, formInComplete: false })
  }

  onChange = e => {
    const { name, value, type, checked } = e.target
    const { errors } = this.state
    errors[name] = false
    if (e && e.target) {
      this.setState({
        [name]: type === 'checkbox' ? checked : value,
        submitted: false,
        errors,
        formInComplete: false
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
    this.setState({
      submitted: true,
      valuationError: false,
      formInComplete: false
    })
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
      userId,
      termsOfUseAndPrivacy,
      agreeToReceiveEmails,
      agreeToReceivePhoneCall,
      agreeToReceiveCYFNews
    } = this.state

    const validatedInputs = this.validateForm({
      firstName,
      lastName,
      email,
      cityId,
      interestedInVolunteer,
      tel,
      termsOfUseAndPrivacy,
      agreeToReceiveEmails,
      agreeToReceivePhoneCall,
      agreeToReceiveCYFNews,
      interestedInCYF
    })
    await this.validateArray({ guidePeople, techSkill, otherSkill })
    const emptyValues = validatedInputs.includes(true)
    const { valuationError } = this.state
    if (emptyValues || valuationError) {
      this.setState({ formInComplete: true })
    }

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
        otherSkill: filterEmptyValue(otherSkill),
        userId
      })
    }
  }

  onChangeCheckList = (e, name) => {
    const { guidePeople, techSkill, otherSkill } = this.state
    this.setState({ formInComplete: false })
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
  showModal = e => {
    if (e && e.target.id) {
      this.setState({ selectedModal: e.target.id })
    }
  }
  render() {
    const { err, volunteer } = this.props
    const {
      disabled,
      termsOfUseAndPrivacy,
      agreeToReceiveEmails,
      agreeToReceivePhoneCall,
      agreeToReceiveCYFNews,
      formInComplete,
      userId,
      dashboardUrl
    } = this.state
    if (volunteer && volunteer._id) {
      return (
        <div className="form-container container p-4">
          <h4>
            Welcome {volunteer.firstName} {volunteer.lastName}
          </h4>
          {userId ? (
            <p>
              Thank you for submitting your application to volunteer with Code
              Your Future (CYF). If you are already a registered user of the CYF
              Admin dashboard, here is a <a href={dashboardUrl}> link</a> to
              login. For new registrants, we will review your application and
              contact you via email, within 10 days.
            </p>
          ) : (
            <p>
              Thank you for submitting your application to Code Your Future to
              become a volunteer. We will review your application and contact
              you via email within 10 days.
            </p>
          )}
        </div>
      )
    }
    return (
      <div className="form-container container">
        <Header err={err} formInComplete={formInComplete} userId={userId} />
        <form className="mb-4" onSubmit={this.handleSubmit} method="post">
          <Inputs
            onChange={this.onChange}
            telOnChange={this.telOnChange}
            onChangeCheckList={this.onChangeCheckList}
            {...this.props}
            {...this.state}
          />
          <Acknowledgement onChange={this.onChange} {...this.state} />
          <button
            className="btn volunteer-submit-btn"
            type="submit"
            disabled={
              disabled ||
              !termsOfUseAndPrivacy ||
              !agreeToReceiveEmails ||
              !agreeToReceivePhoneCall ||
              !agreeToReceiveCYFNews
            }
          >
            Submit
          </button>
        </form>
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
export default connect(mapStateToProps, { loadCities, createVolunteerHandler })(
  Forms
)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createVolunteerHandler, loadCities } from '../../Redux/action'
import { arrayOnChange, filterEmptyValue, initialState } from './helper'
import Header from './header'
import Inputs from './inputs'
import Acknowledgement from './Acknowledgement'
import axios from 'axios'
import { appPath, domain } from '../../config'
import './index.css'
import { getProfile } from '../../layout/AuthService'

const path = `${domain()}${appPath}`
class Forms extends Component {
  state = {
    teamOptions: [],
    employersOptions: [],
    ...initialState
  }

  componentDidMount() {
    this.fetchTeamData()
    this.fetchEmployers()
    const profile = getProfile()
    if (profile) {
      const fullName = profile.fullName.split(' ')
      const firstName = fullName[0] || ''
      const lastName = fullName[1] || ''
      const email = profile.email || ''

      this.setState({
        firstName,
        lastName,
        email
      })
    }
  }

  fetchTeamData = async () => {
    try {
      const response = await axios.get(`${domain()}/teams`)
      const teamData = response.data.teams
      teamData.sort((a, b) => a.name.localeCompare(b.name))
      teamData.push({ name: 'I am not sure' })
      this.setState({ teamOptions: teamData })
    } catch (err) {
      return this.setState({
        err: 'Sorry, we are currently experiencing technical issues, please try again later.'
      })
    }
  }

  fetchEmployers = async () => {
    try {
      const response = await axios.get(`${domain()}/employers`)
      const employersData = response.data.employers
      employersData.sort((a, b) => a.name.localeCompare(b.name))
      this.setState({ employersOptions: employersData })
    } catch (err) {
      return this.setState({
        err: 'Sorry, we are currently experiencing technical issues, please try again later.'
      })
    }
  }

  handleMagicLinkRequest = async e => {
    e.preventDefault()
    const { email, userId } = this.state
    if (email) {
      this.setState({ loading: true, err: '' })
      try {
        const magicLinkRequest = await axios.post(
          `${path}/email/verification`,
          {
            email,
            userId
          }
        )
        if (magicLinkRequest.status === 200) {
          this.setState({
            loading: false,
            msg: 'We have sent you a verification email, Please check your emails.'
          })
        }
      } catch (err) {
        if (
          err.response &&
          err.response.data &&
          err.response.data.err === 'EMAIL_EMPTY'
        ) {
          return this.setState({
            loading: false,
            err: 'Email cannot be empty.'
          })
        }
        if (err.response && err.response.data === 'NO_ACCOUNT') {
          return this.setState({
            loading: false,
            err: 'No account was found.'
          })
        }
        return this.setState({
          err: 'Sorry, we are currently experiencing technical issues, please try again later.',
          loading: false
        })
      }
    }
  }

  UNSAFE_componentWillMount() {
    const dashboardUrl = this.props.location.search
    const { userId, code } = this.props.match.params
    if (code === 'failed') {
      return this.setState({
        userId,
        showEmailBox: true,
        err: 'Failed to verify your email address, due to expire token or server failure. Please use the box below and try again.'
      })
    }
    if (code === 'success') {
      return this.setState({
        msg: `Thank you for your patient, we will review your application and contact you via email, within 10 days.`
      })
    }
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

    // Handle teamId separately
    if (name === 'teamId') {
      this.setState({ teamId: value })
    } else {
      // Handle other form fields
      this.setState({
        [name]: type === 'checkbox' ? checked : value,
        submitted: false,
        errors,
        formInComplete: false,
        err: null
      })

      // Check for special case where name is 'hearAboutCYF'
      if (name === 'hearAboutCYF') {
        this.setState({ hearAboutCYFFromEmployer: value === 'Employer' })
      }
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
      teamId,
      interestedInVolunteer,
      interestedInCYF,
      industry,
      hearAboutCYF,
      hearAboutCYFFromEmployer,
      employer,
      guidePeople,
      techSkill,
      otherSkill,
      userId,
      agreeToTOU,
      agreeToReceiveCommunication
    } = this.state

    const validatedInputs = this.validateForm({
      firstName,
      lastName,
      email,
      cityId,
      teamId,
      employer: hearAboutCYFFromEmployer ? employer : true,
      interestedInVolunteer,
      tel,
      agreeToTOU,
      interestedInCYF,
      agreeToReceiveCommunication
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
        teamId,
        interestedInVolunteer,
        interestedInCYF,
        industry,
        hearAboutCYF,
        employer: hearAboutCYFFromEmployer ? employer : '',
        guidePeople: filterEmptyValue(guidePeople),
        techSkill: filterEmptyValue(techSkill),
        otherSkill: filterEmptyValue(otherSkill),
        userId,
        agreeToTOU,
        agreeToReceiveCommunication
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
  UNSAFE_componentWillReceiveProps(newProps) {
    const { volunteer, err } = newProps
    this.setState({ err, volunteer })
    const { userId } = this.props.match.params
    if (userId && err === 'An account with this email address already exists') {
      this.setState({ showEmailBox: true })
    }
  }
  render() {
    const {
      disabled,
      agreeToTOU,
      formInComplete,
      userId,
      dashboardUrl,
      agreeToReceiveCommunication,
      showEmailBox,
      msg,
      loading,
      err,
      volunteer
    } = this.state
    if (loading) {
      return (
        <div className="d-flex justify-content-center mt-5">
          <div className="loader" />
        </div>
      )
    }
    if (msg) {
      return (
        <div className="success-message-box">
          <p className="success" style={{ fontSize: '24px' }}>
            {msg}
          </p>
        </div>
      )
    }
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
            <div>
              <p>
                Thank you for submitting your application to Code Your Future to
                become a volunteer. We will review your application and contact
                you via email within 10 days.
              </p>
              <p>
                While you wait, we encourage you to read our documentation
                <a href="https://docs.codeyourfuture.io/volunteers">here</a>
              </p>
            </div>
          )}
        </div>
      )
    }
    return (
      <div className="form-container container">
        {err && (
          <p className="errors">
            {err}
            {window.scrollTo(0, 0)}
          </p>
        )}
        {showEmailBox ? (
          <div className="forms-important-box">
            <div>
              <p>
                <strong>Important: </strong>this form will send you a
                verification email before getting access to our dashboard
              </p>
              <p>
                <strong>
                  Please enter your email you used and click submit
                </strong>
              </p>
              <form
                className="forms-important-box-form"
                onSubmit={this.handleMagicLinkRequest}
              >
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  name="email"
                  placeholder="example@example.example"
                  type="email"
                />
                <button disabled={!this.state.email} type="submit">
                  Submit
                </button>
              </form>
              <span
                style={{ cursor: 'pointer', color: '#0053ff' }}
                onMouseDown={() => this.setState({ showEmailBox: false })}
              >
                Back
              </span>
            </div>
          </div>
        ) : (
          <div>
            <Header formInComplete={formInComplete} userId={userId} />
            {userId && (
              <div className="forms-important-box">
                <span>
                  <strong>Important:</strong> If you already completed this form
                  in some point please click{' '}
                  <span
                    style={{ cursor: 'pointer', color: '#0053ff' }}
                    onMouseDown={() => this.setState({ showEmailBox: true })}
                  >
                    here
                  </span>
                  .
                </span>
              </div>
            )}
            <form className="mb-4" onSubmit={this.handleSubmit} method="post">
              <Inputs
                onChange={this.onChange}
                telOnChange={this.telOnChange}
                onChangeCheckList={this.onChangeCheckList}
                teamOptions={this.state.teamOptions}
                employersOptions={this.state.employersOptions}
                {...this.props}
                {...this.state}
              />
              <Acknowledgement onChange={this.onChange} {...this.state} />
              <button
                disabled={
                  disabled || !agreeToTOU || !agreeToReceiveCommunication
                }
                className="btn volunteer-submit-btn"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        )}
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

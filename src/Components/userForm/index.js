import React, { Component } from 'react'
import './ApplicationForm.css'
import { connect } from 'react-redux'

import { loadCities, createUserHandler } from '../../Redux/action'
import { initialState, getAgeFromBirthday } from './helper'
import ApplicationInputs from './inputs'

import 'react-day-picker/lib/style.css'

class ApplicationForm extends Component {
  state = initialState

  componentWillMount() {
    this.props.loadCities()
  }

  componentWillReceiveProps() {
    const { user } = this.props
    if (user._id && !user.userExist) {
      this.props.history.replace(`/teams/${user._id}`)
    }
  }

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

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ submitted: true })
    const { firstName, lastName, email, city, tel, cityId } = this.state
    const validatedInputs = this.validateForm({
      firstName,
      lastName,
      email,
      city,
      tel,
      cityId
    })
    const emptyValues = validatedInputs.includes(true)
    if (!emptyValues) {
      this.props.createUserHandler({
        firstName,
        lastName,
        email,
        city,
        tel,
        cityId
      })
    }
  }

  dateOfBirthOnChange = dateOfBirth => {
    const age = getAgeFromBirthday(dateOfBirth)
    this.setState({
      dateOfBirth,
      isEighteen: age >= 18
    })
  }

  render() {
    const { submitted } = this.state
    const { err } = this.props
    return (
      <div className="form-container container">
        <div>
          <div className="sign-in">
            <h1 className="font-bold">CYF Volunteer Application Form</h1>
            <p>
              So, you are interested in volunteering for CodeYourFuture?
              Fantastic! We just need a few pieces of information to help us get
              organised and welcome you.
            </p>
            {err && (
              <p className="error">
                {err}
                {window.scrollTo(0, 0)}
              </p>
            )}
            <form className="mb-4" onSubmit={this.handleSubmit} method="post">
              <ApplicationInputs
                onChange={this.onChange}
                {...this.state}
                {...this.props}
                dateOfBirthOnChange={this.dateOfBirthOnChange}
                telOnChange={this.telOnChange}
              />
              <div />
              <button
                id="email-exist"
                disabled={submitted}
                className="btn sign-up-btn"
                type="submit"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export function mapStateToProps(store) {
  const { cities, volunteer } = store
  return {
    cities,
    user: volunteer && volunteer.user,
    err: volunteer && volunteer.err
  }
}
export default connect(
  mapStateToProps,
  { loadCities, createUserHandler }
)(ApplicationForm)

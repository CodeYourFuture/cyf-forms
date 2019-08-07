import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCities, createUserHandler } from '../../Redux/action'
import UserForm from './userForm'
import { initialState, getAgeFromBirthday } from './helper'

class Forms extends Component {
  state = initialState

  componentWillMount() {
    this.props.loadCities()
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps)
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

  userHandleSubmit = async e => {
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
    const formPages = [
      <UserForm
        {...this.props}
        {...this.state}
        dateOfBirthOnChange={this.dateOfBirthOnChange}
        userHandleSubmit={this.userHandleSubmit}
        onChange={this.onChange}
        telOnChange={this.telOnChange}
      />
    ]
    return (
      <div>
        {formPages.map(FormPage => {
          return FormPage
        })}
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
)(Forms)

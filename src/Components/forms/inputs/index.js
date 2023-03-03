import React, { Component, Fragment } from 'react'
import ListsData from '../data.json'
import PhoneNumber from './phoneNumber'
import DropDown from './dropDown'
import TextInput from './textInput'
import TextArea from './textArea'
import CheckListB from './checkListB'
import CheckListH from './checkListH'
import EmployerDropDown from './EmployerDropDown'

export default class VolunteerForm extends Component {
  render() {
    const {
      onChange,
      firstName,
      lastName,
      tel,
      cities,
      cityId,
      email,
      employer,
      telOnChange,
      errors,
      volunteer,
      interestedInVolunteer,
      interestedInCYF,
      industry,
      hearAboutCYF,
      hearAboutCYFFromEmployer,
      onChangeCheckList,
      guidePeople,
      techSkill,
      otherSkill,
      onEmployerChange,
      onInputChange
    } = this.props

    return (
      <Fragment>
        <div className="form-section-one">
          <TextInput
            onChange={onChange}
            value={firstName}
            isEmpty={errors.firstName}
            label="First Name *"
            name="firstName"
            placeholder="Your first name..."
            type="text"
          />
          <TextInput
            onChange={onChange}
            value={lastName}
            isEmpty={errors.lastName}
            label="Last Name *"
            name="lastName"
            placeholder="Your last name..."
            type="text"
          />
          <TextInput
            onChange={onChange}
            value={email}
            isEmpty={errors.email}
            emailExist={volunteer.userExist}
            label="Email *"
            name="email"
            placeholder="example@example.example"
            type="email"
          />
          <PhoneNumber onChange={telOnChange} tel={tel} isEmpty={errors.tel} />
        </div>
        <DropDown
          onChange={onChange}
          value={cityId}
          name="cityId"
          arrayList={cities}
          isEmpty={errors.cityId}
          label="What Code Your Future city do you want to work with? *"
        />
        <p className="contact-interested">
          If you're interested in bringing Code Your Future to your city, email
          us at
          <a
            href="mailto: contact@codeyourfuture.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            contact@codeyourfuture.io
          </a>
        </p>
        <TextArea
          onChange={onChange}
          value={interestedInVolunteer}
          isEmpty={errors.interestedInVolunteer}
          label="Why are you interested in volunteering? *"
          name="interestedInVolunteer"
          placeholder="Just one or two sentences as required..."
          type="textarea"
        />
        <TextArea
          onChange={onChange}
          value={interestedInCYF}
          isEmpty={errors.interestedInCYF}
          label="Why are you interested in Code Your Future? *"
          name="interestedInCYF"
          placeholder="Just one or two sentences as required..."
          type="textarea"
        />
        <DropDown
          onChange={onChange}
          value={industry}
          name="industry"
          arrayList={ListsData.industryList}
          isEmpty={errors.industry}
          label="What industry are you in?"
        />
        <DropDown
          onChange={onChange}
          value={hearAboutCYF}
          name="hearAboutCYF"
          arrayList={ListsData.hearAboutCYFList}
          isEmpty={errors.hearAboutCYF}
          label="Where did you hear about Code Your Future?"
        />
        <div className="employer-select">
          {hearAboutCYFFromEmployer && (
            <EmployerDropDown
              value={employer}
              isEmpty={errors.employer}
              onInputChange={onInputChange}
              onChange={onEmployerChange}
              arrayList={ListsData.employerList}
            />
          )}
        </div>
        <span className="contact-interested">
          <span>
            What would you like help Code Your Future with, and what is your
            level of experience?
          </span>
        </span>
        <div>
          <CheckListH list={ListsData.GuidePeopleThList} />
          <CheckListB
            onChange={onChangeCheckList}
            list={guidePeople}
            name="guidePeople"
          />
        </div>
        <div>
          <CheckListH list={ListsData.TechSkillThList} />
          <CheckListB
            onChange={onChangeCheckList}
            list={techSkill}
            name="techSkill"
          />
        </div>
        <div>
          <CheckListH list={ListsData.OtherSkillThList} />
          <CheckListB
            onChange={onChangeCheckList}
            list={otherSkill}
            name="otherSkill"
          />
        </div>
      </Fragment>
    )
  }
}

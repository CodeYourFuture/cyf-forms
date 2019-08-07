import React, { Fragment } from 'react'
import FirstName from './firstName'
import LastName from './lastName'
import PhoneNumber from './phoneNumber'
import CyfCity from './cyfCity'
import Email from './email'
import City from './city'

export default ({
  onChange,
  firstName,
  lastName,
  tel,
  cities,
  cityId,
  email,
  city,
  telOnChange,
  errors,
  user
}) => {
  return (
    <Fragment>
      <div className="application-form-section-one">
        <FirstName
          onChange={onChange}
          firstName={firstName}
          isEmpty={errors.firstName}
        />
        <LastName
          onChange={onChange}
          lastName={lastName}
          isEmpty={errors.lastName}
        />
        <PhoneNumber onChange={telOnChange} tel={tel} isEmpty={errors.tel} />
        <Email
          onChange={onChange}
          email={email}
          isEmpty={errors.email}
          emailExist={user.userExist}
        />
      </div>
      <City city={city} onChange={onChange} isEmpty={errors.city} />
      <CyfCity
        onChange={onChange}
        cityId={cityId}
        cities={cities}
        isEmpty={errors.cityId}
      />
    </Fragment>
  )
}

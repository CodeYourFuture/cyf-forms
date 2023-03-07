import React from 'react'
import { Label } from 'reactstrap'
import Select from 'react-select/creatable'

const EmployerDropDown = ({ onChange, isEmpty, arrayList }) => {
  const employersList = arrayList.map(({ _id, name }) => ({
    value: _id,
    label: name
  }))
  return (
    <div className="form-group">
      <Label htmlFor="employer">Who is your employer? *</Label>
      <Select
        className={isEmpty ? 'is-empty' : ''}
        inputId="employer"
        isSearchable
        options={employersList}
        onChange={e =>
          onChange({
            target: { name: 'employer', type: 'text', value: e.value }
          })
        }
        name="employer"
        placeholder="Type your employer name here"
      />
    </div>
  )
}

export default EmployerDropDown

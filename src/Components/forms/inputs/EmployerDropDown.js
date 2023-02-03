import React, { useState } from 'react'
import { Label } from 'reactstrap'
import Select from 'react-select'

const EmployerDropDown = ({ onChange, isEmpty, arrayList, name }) => {
  const [value, setValue] = useState('')
  const employerSorter = (a, b) => {
    const aIndex = a.value.toLowerCase().indexOf(value.toLowerCase())
    const bIndex = b.value.toLowerCase().indexOf(value.toLowerCase())
    return a.value === 'Other' || b.value === 'Other'
      ? 1
      : aIndex > bIndex
      ? 1
      : aIndex < bIndex
      ? -1
      : 0
  }
  const employersList = arrayList
    .map(item => ({
      value: item.name,
      label: item.name
    }))
    .sort(employerSorter)
  return (
    <div className="form-group" data-testid="form-group">
      <Label htmlFor="employer">"Who is your employer? *"</Label>
      <Select
        className={`form-control ${isEmpty && 'is-empty'}`}
        noOptionsMessage={() => 'Employer not found? Please select "Other".'}
        inputId="employer"
        onInputChange={inputVal => setValue(inputVal)}
        options={employersList}
        onChange={e =>
          onChange({
            target: { name: 'employer', type: 'text', value: e.value }
          })
        }
        placeholder="Type your employer name here"
      />
    </div>
  )
}

export default EmployerDropDown

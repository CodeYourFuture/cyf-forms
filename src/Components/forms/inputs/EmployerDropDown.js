import { useEffect, useState } from 'react'
import { Label } from 'reactstrap'
import Select from 'react-select/creatable'

const EmployerDropDown = ({ arrayList, isEmpty, onChange, value }) => {
  const [employersList, setEmployersList] = useState([])
  useEffect(() => {
    setEmployersList(
      arrayList.map(({ _id, name }) => ({
        value: _id,
        label: name
      }))
    )
  }, [arrayList])
  const handleChange = e =>
    onChange({
      target: { name: 'employer', type: 'text', value: e.value }
    })
  return (
    <div className="form-group">
      <Label htmlFor="employer">Who is your employer? *</Label>
      <Select
        className={isEmpty ? 'is-empty' : ''}
        inputId="employer"
        isSearchable
        options={employersList}
        onChange={handleChange}
        onCreateOption={newEmployer => {
          setEmployersList(oldList => insertedInto([...oldList], newEmployer))
          handleChange({ value: newEmployer })
        }}
        name="employer"
        placeholder="Type your employer name here"
        value={employersList.find(employer => employer.value === value)}
      />
    </div>
  )
}

const insertedInto = (employers, employer) => {
  const canonical = employer.toLowerCase()
  const entry = { label: employer, value: employer }
  for (let index = 0; index < employers.length; index++) {
    if (canonical < employers[index].value.toLowerCase()) {
      employers.splice(index, 0, entry)
      return employers
    }
  }
  employers.push(entry)
  return employers
}

export default EmployerDropDown

import { useMemo } from 'react'
import { Label } from 'reactstrap'
import Select from 'react-select/creatable'

import useSession from '../../../hooks/useSession'

const EmployerDropDown = ({
  arrayList: employers,
  isEmpty,
  onChange,
  value
}) => {
  const [options, setOptions] = useSession('cyfEmployerList', () =>
    employers.map(({ _id, name }) => ({
      value: _id,
      label: name
    }))
  )

  const isCustomEntry = useMemo(
    () => value !== '' && !employers.some(({ name }) => name === value),
    [employers, value]
  )

  const selectedOption = useMemo(
    () => options.find(employer => employer.value === value),
    [options, value]
  )

  const handleChange = value =>
    onChange({ target: { name: 'employer', type: 'text', value } })

  return (
    <div className="form-group">
      <Label htmlFor="employer">Who is your employer? *</Label>
      <Select
        className={isEmpty ? 'is-empty' : ''}
        inputId="employer"
        isClearable
        isSearchable
        name="employer"
        onChange={event => handleChange(event?.value ?? '')}
        onCreateOption={newEmployer => {
          setOptions(oldOptions => insertedInto(oldOptions, newEmployer))
          handleChange(newEmployer)
        }}
        options={options.sort((a, b) => a.label.localeCompare(b.label))}
        placeholder="Type your employer name here"
        value={selectedOption}
      />
      {isCustomEntry && (
        <p className="reminder">
          This employer will be added to our list. Make sure you typed it
          correctly.
        </p>
      )}
    </div>
  )
}

const insertedInto = (oldOptions, newEmployer) => {
  const options = [...oldOptions]
  const canonical = newEmployer.toLowerCase()
  const entry = { label: newEmployer, value: newEmployer }
  for (let index = 0; index < options.length; index++) {
    if (canonical < options[index].value.toLowerCase()) {
      options.splice(index, 0, entry)
      return options
    }
  }
  options.push(entry)
  return options
}

export default EmployerDropDown

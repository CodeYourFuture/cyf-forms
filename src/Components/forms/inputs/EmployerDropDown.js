import { useEffect, useState } from 'react'
import { Label } from 'reactstrap'
import Select from 'react-select/creatable'

const EmployerDropDown = ({
  arrayList: employers,
  isEmpty,
  onChange,
  value
}) => {
  const [isCustomEntry, setIsCustomEntry] = useState(false)
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState()

  useEffect(() => {
    setOptions(
      employers.map(({ _id, name }) => ({
        value: _id,
        label: name
      }))
    )
  }, [employers])

  useEffect(() => {
    setIsCustomEntry(
      value !== '' && !employers.some(({ name }) => name === value)
    )
  }, [employers, value])

  useEffect(() => {
    setSelectedOption(options.find(employer => employer.value === value))
  }, [options, value])

  const handleChange = e =>
    onChange({
      target: {
        name: 'employer',
        type: 'text',
        value: e?.value ?? ''
      }
    })

  return (
    <div className="form-group">
      <Label htmlFor="employer">Who is your employer? *</Label>
      <Select
        className={isEmpty ? 'is-empty' : ''}
        inputId="employer"
        isClearable
        isSearchable
        name="employer"
        onChange={handleChange}
        onCreateOption={newEmployer => {
          setOptions(oldOptions => insertedInto([...oldOptions], newEmployer))
          handleChange({ value: newEmployer })
        }}
        options={options}
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

const insertedInto = (options, newEmployer) => {
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

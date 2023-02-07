import { useMemo, useState } from 'react'
import Select from 'react-select'
import { Label } from 'reactstrap'

export default function EmployerDropDown({
  arrayList: partners,
  isEmpty,
  onChange
}) {
  const [currentInput, setCurrentInput] = useState('')
  const inputId = 'employer-select'
  const options = useMemo(
    () =>
      partners
        .map(({ _id, name }) => ({
          label: name,
          value: _id
        }))
        .sort(createPrefixSorter(currentInput)),
    [currentInput, partners]
  )
  return (
    <div className="form-group">
      <Label htmlFor={inputId}>Who is your employer? *</Label>
      <Select
        className={isEmpty ? 'is-empty' : ''}
        inputId={inputId}
        isSearchable
        name="employer"
        noOptionsMessage={() => 'No matches found, please select "Other"'}
        onChange={({ value }) =>
          onChange({ target: { name: 'employer', type: 'text', value } })
        }
        onInputChange={newValue => setCurrentInput(newValue.toLowerCase())}
        options={options}
      />
    </div>
  )
}

const A_BEFORE_B = -1
const SAME_ORDER = 0
const B_BEFORE_A = 1

const createPrefixSorter = currentInput => (a, b) => {
  if (currentInput === '') {
    return SAME_ORDER
  }
  // Always push Other down
  if (a.label === 'Other') {
    return B_BEFORE_A
  }
  if (b.label === 'Other') {
    return A_BEFORE_B
  }
  // Always bring prefix up
  if (
    a.label.toLowerCase().startsWith(currentInput) &&
    !b.label.toLowerCase().startsWith(currentInput)
  ) {
    return A_BEFORE_B
  }
  if (
    b.label.toLowerCase().startsWith(currentInput) &&
    !a.label.toLowerCase().startsWith(currentInput)
  ) {
    return B_BEFORE_A
  }
  return SAME_ORDER
}

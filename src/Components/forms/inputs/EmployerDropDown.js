import { useMemo } from 'react'
import Select from 'react-select'
import { Label } from 'reactstrap'

export default function EmployerDropDown({
  arrayList: partners,
  isEmpty,
  onChange
}) {
  const inputId = 'employer-select'
  const options = useMemo(
    () =>
      partners.map(({ _id, name }) => ({
        label: name,
        value: _id
      })),
    [partners]
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
        options={options}
      />
    </div>
  )
}

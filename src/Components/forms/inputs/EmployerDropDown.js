import Select from 'react-select'
import { Label } from 'reactstrap'

export default function EmployerDropDown({
  arrayList,
  isEmpty,
  label,
  name,
  onChange
}) {
  const inputId = `${name}-employer-select`
  return (
    <div className="form-group">
      <Label htmlFor={inputId}>{label}</Label>
      <Select
        className={isEmpty ? 'is-empty' : ''}
        inputId={inputId}
        isSearchable
        name={name}
        noOptionsMessage={() => 'No matches found, please select "Other"'}
        onChange={({ value }) =>
          onChange({ target: { name, type: 'text', value } })
        }
        options={arrayList.map(({ _id, name }) => ({
          label: name,
          value: _id
        }))}
      />
    </div>
  )
}

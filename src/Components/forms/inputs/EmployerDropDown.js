import Select from 'react-select'
import { Label } from 'reactstrap'

export default function EmployerDropDown({ arrayList, isEmpty, onChange }) {
  const inputId = 'employer-select'
  const inputName = 'employer'
  return (
    <div className="form-group">
      <Label htmlFor={inputId}>Who is your employer? *</Label>
      <Select
        className={isEmpty ? 'is-empty' : ''}
        inputId={inputId}
        isSearchable
        name={inputName}
        noOptionsMessage={() => 'No matches found, please select "Other"'}
        onChange={({ value }) =>
          onChange({
            target: { name: inputName, type: 'text', value }
          })
        }
        options={arrayList.map(({ _id, name }) => ({
          label: name,
          value: _id
        }))}
      />
    </div>
  )
}

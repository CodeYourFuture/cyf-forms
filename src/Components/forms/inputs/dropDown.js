import React from 'react'
import { Label } from 'reactstrap'
function SelectOption(arrayList) {
  if (arrayList) {
    return arrayList.map(item => {
      return (
        <option key={item._id} value={item._id}>
          {item.name}
        </option>
      )
    })
  }
}

export default ({ onChange, label, name, arrayList, value }) => {
  return (
    <div className="form-group">
      <Label htmlFor={name}>{label}</Label>
      <select
        className={`form-control`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          Select here
        </option>
        {SelectOption(arrayList)}
      </select>
    </div>
  )
}

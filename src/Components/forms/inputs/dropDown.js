import React from 'react'

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

export default ({ onChange, isEmpty, label, name, arrayList, value }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="lead">
        {label}
      </label>
      <select
        className={`form-control ${isEmpty && 'is-empty'}`}
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

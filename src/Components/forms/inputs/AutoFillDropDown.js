import React, { useState } from 'react'
import { Label } from 'reactstrap'
import '../index.css'

const AutoFillDropDown = ({
  employerOnChange,
  isEmpty,
  label,
  name,
  arrayList
}) => {
  const [value, setValue] = useState('')
  const filteredEmployers = arrayList.filter(item => {
    const searchTerm = value.toLowerCase()
    const employer = item.name.toLowerCase()
    const matchSearch =
      value.length === 1
        ? employer.includes(searchTerm)
        : employer.startsWith(searchTerm)
    return searchTerm && matchSearch && employer !== searchTerm
  })
  const employerSorter = (a, b) => {
    const aIndex = a.name.toLowerCase().indexOf(value.toLowerCase())
    const bIndex = b.name.toLowerCase().indexOf(value.toLowerCase())
    return aIndex > bIndex ? 1 : aIndex < bIndex ? -1 : 0
  }

  const onSearch = searchTerm => {
    setValue(searchTerm)
    employerOnChange(searchTerm)
  }
  return (
    <div className="form-group">
      <Label htmlFor={name}>{label}</Label>
      <input
        className={`form-control ${isEmpty && 'is-empty'}`}
        type="text"
        id={name}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Type your employer name here"
        autoComplete="no"
      />
      <div className="options">
        {filteredEmployers.sort(employerSorter).map(item => (
          <option
            className="employer-option"
            onClick={() => {
              onSearch(item.name)
            }}
            onKeyDown={e => e.key === 'Enter' && onSearch(item.name)}
            key={item._id}
            tabIndex={0}
          >
            {item.name}
          </option>
        ))}
      </div>
    </div>
  )
}

export default AutoFillDropDown

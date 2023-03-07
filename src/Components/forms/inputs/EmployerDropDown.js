import React, { Fragment } from 'react'
import CreatableSelect from 'react-select/creatable'
import { useState } from 'react'
import './index.css'

const EmployerDropDown = ({ onChange, arrayList, value }) => {
  const createOption = label => ({
    label,
    value: label.replace(/\./g, '')
  })

  const defaultOptions = arrayList.map(({ name }) => {
    return createOption(name)
  })
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState(defaultOptions)
  const [val, setValue] = useState('')
  const [showTextOnSuccessfulSubmit, setSuccessfulySubmittedMsg] = useState('')

  const typeNewEmployer = inputValue => {
    setIsLoading(true)
    setTimeout(() => {
      const newOption = createOption(inputValue)
      const newOptions = [...options, newOption].sort((a, b) => {
        if (a.value < b.value) {
          return -1
        }
        if (a.value > b.value) {
          return 1
        }
      })
      setOptions(newOptions)
      setValue(newOption)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Fragment>
      <CreatableSelect
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={e => {
          onChange({
            target: { name: 'employer', type: 'text', value: e.value }
          })
          setValue({ label: e.label, value: e.label })
        }}
        onCreateOption={typeNewEmployer}
        options={options}
        onInputChange={typed => {
          let results = options.map(employer => employer.value)
          const matchedEmployers = results.filter(employer =>
            employer.includes(typed)
          )
          matchedEmployers.length === 0
            ? setSuccessfulySubmittedMsg(
                'This employer will be added to our list. Make sure you typed it correctly.'
              )
            : setSuccessfulySubmittedMsg('')
          onChange({
            target: { name: 'employer', type: 'text', value: typed }
          })
        }}
        value={val}
        placeholder="Type your employer name here"
      />
      {showTextOnSuccessfulSubmit.length > 0 && (
        <p>{showTextOnSuccessfulSubmit}</p>
      )}
    </Fragment>
  )
}

export default EmployerDropDown

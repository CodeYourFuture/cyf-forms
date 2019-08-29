import React, { Fragment } from 'react'
import { radioButtonList } from '../helper'
import CheckBox from './CheckBox'
import RadioButton from './radioButton'

export default ({ onChange, list }) => {
  return (
    <Fragment>
      {list.map(listItem => {
        return (
          <tr key={listItem.label}>
            <td className="form-table-td row">
              <CheckBox
                value={`checkBox-${listItem.id}`}
                onChange={onChange}
                label={listItem.label}
                name={listItem.label}
                checked={listItem.name === listItem.label}
              />
              {listItem.label === 'Other' && (
                <input
                  type="text"
                  name={listItem.label}
                  placeholder=""
                  className="ml-5"
                  value={listItem.level}
                  onChange={onChange}
                />
              )}
            </td>
            {listItem.label !== 'Other' &&
              radioButtonList.map(item => (
                <td className="form-table-td" key={item._id}>
                  <RadioButton
                    value={`radioButton-${item._id}`}
                    onChange={onChange}
                    name={listItem.label}
                    checked={listItem.level === item._id}
                  />
                </td>
              ))}
          </tr>
        )
      })}
    </Fragment>
  )
}

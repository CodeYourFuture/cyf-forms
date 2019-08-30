import React, { Fragment } from 'react'
import ListsData from '../data.json'

import CheckBox from './CheckBox'
import RadioButton from './radioButton'

export default ({ onChange, list }) => {
  return (
    <Fragment>
      {list.map(listItem => {
        return (
          <tr
            key={listItem.label}
            className={`form-table-tr ${listItem.level === "It's empty" &&
              'form-table-tr-is-empty'}`}
          >
            <td className="form-table-td row">
              <CheckBox
                value={`checkBox-${listItem.id}`}
                onChange={onChange}
                label={listItem.label}
                name={listItem.label}
                checked={listItem.name === listItem.label}
                id={listItem.id}
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
              ListsData.radioButtonList.map(item => (
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

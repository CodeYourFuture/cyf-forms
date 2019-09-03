import React, { Fragment } from 'react'
import ListsData from '../data.json'

import CheckBox from './CheckBox'
import RadioButton from './radioButton'

export default ({ onChange, list, name }) => {
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
                value={listItem.id}
                onChange={e => onChange(e, name)}
                label={listItem.label}
                name={listItem.label}
                checked={listItem.name === listItem.label}
                id={listItem.id}
              />
              {listItem.label === 'Other' && (
                <input
                  type="text"
                  name={listItem.label}
                  placeholder={` Other`}
                  className="ml-5"
                  value={listItem.level === "It's empty" ? '' : listItem.level}
                  onChange={e => onChange(e, name)}
                />
              )}
            </td>
            {listItem.label !== 'Other' &&
              ListsData.radioButtonList.map(item => (
                <td className="form-table-td" key={item._id}>
                  <RadioButton
                    value={item._id}
                    onChange={e => onChange(e, name)}
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

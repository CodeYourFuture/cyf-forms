import React, { Fragment } from 'react'
import ListsData from '../../data.json'
import CheckBox from '../CheckBox'
export default ({ onChange, list, name }) => {
  return (
    <Fragment>
      {list.map(listItem => (
        <tr
          className={`form-table-tr desktop ${listItem.level === "It's empty" &&
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
                <input
                  type="radio"
                  name={listItem.label}
                  onChange={e => onChange(e, name)}
                  value={item._id}
                  id={item._id}
                  checked={listItem.level === item._id}
                />
              </td>
            ))}
        </tr>
      ))}
    </Fragment>
  )
}

import React, { Fragment } from 'react'
import ListsData from '../data.json'
import CheckBox from './CheckBox'

export default ({ onChange, list, name }) => {
  return (
    <Fragment>
      {list.map(listItem => (
        <div
          key={listItem.label}
          className={`form-table ${listItem.level === "It's empty" &&
            'form-table-tr-is-empty'}`}
        >
          <div className="form-table-single">
            <CheckBox
              value={listItem.id}
              onChange={e => onChange(e, name)}
              label={listItem.label}
              name={listItem.label}
              checked={listItem.name === listItem.label}
              id={`media${listItem.id}`}
            />
            {listItem.name === listItem.label ? (
              <span className="radio-group">
                {listItem.label !== 'Other' ? (
                  ListsData.radioButtonList.map(item => (
                    <label
                      htmlFor={`media${listItem.id}${item._id}`}
                      className="btn radio-btn"
                      key={item._id}
                    >
                      <input
                        type="radio"
                        name={listItem.label}
                        id={`media${listItem.id}${item._id}`}
                        onChange={e => onChange(e, name)}
                        value={item._id}
                        checked={listItem.level === item._id}
                      />{' '}
                      {item.value}
                    </label>
                  ))
                ) : (
                  <input
                    type="text"
                    name={listItem.label}
                    placeholder={` `}
                    className="form-control ml-1"
                    value={
                      listItem.level === "It's empty" ? '' : listItem.level
                    }
                    onChange={e => onChange(e, name)}
                  />
                )}
                {listItem.label !== 'Other' && (
                  <p className="check-list-single-footer">Choose your level</p>
                )}
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      ))}
    </Fragment>
  )
}

import React, { Fragment } from 'react'

export default ({ list }) => {
  return (
    <Fragment>
      <tr className="desktop">
        {list &&
          list.map((item, i) => (
            <th
              className="border-none"
              key={`${i}${item}`}
              style={i === 0 ? { width: '50%' } : { width: '15%' }}
            >
              {item}
            </th>
          ))}
      </tr>
      <tr className="media">
        {list && <th className="border-none">{list[0]}</th>}
      </tr>
    </Fragment>
  )
}

import React, { Fragment } from 'react'

export default ({ list }) => {
  return (
    <Fragment>
      {list &&
        list.map((item, i) => (
          <div className="check-list-header" key={`${i}${item}`}>
            {item}
          </div>
        ))}
    </Fragment>
  )
}

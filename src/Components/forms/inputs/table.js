import React from 'react'

export default props => {
  return (
    <table className="form-table table">
      <thead>{props.componentTh}</thead>
      <tbody>{props.componentTb}</tbody>
    </table>
  )
}

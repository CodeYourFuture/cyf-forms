import React from 'react'

export default props => {
  return (
    <table className="form-table table">
      <thead className="form-table-thead">{props.componentTh}</thead>
      <tbody className="form-table-tbody">{props.componentTb}</tbody>
    </table>
  )
}

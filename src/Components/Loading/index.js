import React from 'react'

export default ({ err, msg }) => {
  if (err) {
    return <p className="errors">{err}</p>
  }
  if (msg) {
    return <p className="success">{msg}</p>
  }
  return (
    <div className="d-flex justify-content-center mt-5 p-5">
      <div className="loader" />
    </div>
  )
}

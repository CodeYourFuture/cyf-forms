import React from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'

import Forms from '../Components/forms'
import NotFound from '../Components/NotFound'

function WithRouteProps({ children: Component }) {
  const location = useLocation()
  const params = useParams()
  return <Component location={location} match={{ params }} />
}

export default () => (
  <Routes>
    <Route path="/" element={<WithRouteProps children={Forms} />} />
    <Route path="/code/:userId" element={<WithRouteProps children={Forms} />}>
      <Route path=":code" element={<WithRouteProps children={Forms} />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
)

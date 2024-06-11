import React, { useEffect } from 'react'
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom'
import Forms from '../Components/forms'
import NotFound from '../Components/NotFound'
import SignUp from '../Components/auth/signUp'
import * as AuthService from '../layout/AuthService'
import Login from '../Components/auth/Login'

function WithRouteProps({ children: Component }) {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      navigate('/sign-up')
    }
  }, [location, navigate])

  return <Component location={location} match={{ params }} />
}

export default () => (
  <Routes>
    <Route exact path="/sign-up" element={<SignUp />} />
    <Route exact path="/log-in/:token" element={<Login />} />
    <Route path="/" element={<WithRouteProps children={Forms} />} />
    <Route path="/code/:userId" element={<WithRouteProps children={Forms} />}>
      <Route path=":code" element={<WithRouteProps children={Forms} />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
)

import { apiEndpoints } from "../utils/apiEndpoints"
import axios from "axios"
import { domain, appPath } from "../utils/apiPath"
export const START_FORM_SUBMISSION = "START_FORM_SUBMISSION"
export const END_FORM_SUBMISSION = "END_FORM_SUBMISSION"
export const GET_CITIES = "GET_CITIES"
const path = `${domain()}${appPath}`
export const startFormSubmission = () => ({
  type: START_FORM_SUBMISSION
})

axios.defaults.headers.common.application = 'volunteer-form'
axios.defaults.headers.common['Content-Type'] = 'application/json'

export const endFormSubmission = hasSucceeded => ({
  type: END_FORM_SUBMISSION,
  hasSucceeded
})
export const postVolunteerForm = async volunteer => {
  try {
    return await axios.post(`${path}`, volunteer)
  } catch (err) {
    throw new Error(err)
  }
}
export const postVolunteerFormToGoogleSheet = (name, values) => {
  try {
    return axios.post(apiEndpoints[name], {
      Authorization: `Timestamp ${Date.now()}`,
      ...values
    }, {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      })
  } catch (err) {
    throw new Error(err)
  }
}

export const postForm = (name, values) => async dispatch => {
  try {
    dispatch(startFormSubmission())
    await postVolunteerForm(values)
    await postVolunteerFormToGoogleSheet(name, values)
    dispatch(endFormSubmission(true))
  } catch (err) {
    dispatch(endFormSubmission(false))
  }
}

export const getCitiesFromApi = async () => {
  try {
    let cities
    cities = await axios.get(`https://cyf-api.codeyourfuture.io/cities`)
    if (cities.data && cities.data.cities) {
      return cities.data.cities
    }
    return []
  } catch (err) {
    return err
  }
}

export const setCitiesToStore = cities => {
  return {
    type: GET_CITIES,
    cities
  }
}
export const getCities = () => {
  return async dispatch => {
    const data = await getCitiesFromApi()
    dispatch(setCitiesToStore(data))
  }
}

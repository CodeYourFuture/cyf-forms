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
export const postVolunteerFormToSpritSheet = (name, values) => {
  try {
    return fetch(apiEndpoints[name], {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Authorization: `Timestamp ${Date.now()}`,
        ...values
      })
    })
  } catch (err) {
    throw new Error(err)
  }
}

export const postForm = (name, values) => async dispatch => {
  try {
    dispatch(startFormSubmission())
    await postVolunteerForm(values)
    await postVolunteerFormToSpritSheet(name, values)
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

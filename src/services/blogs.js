import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject, id) => {
  //console.log('blogservices.update newObject', newObject, 'id: ', id)
  //console.log('baseurl + id', `${baseUrl}/${id}`)
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  //console.log('response.data', response.data)
  //console.log('response.status', response.status)
  //console.log('response.error', response.error)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update }
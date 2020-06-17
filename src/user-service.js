import axios from 'axios'

const baseUrl = 'https://reqres.in/api/'

export const getUsers = () => {
  return axios.get(baseUrl + 'users')
}

export const getUser = (id) => {
  return axios.get(baseUrl + `users/${id}`)
}

export const storeUser = (payload) => {
  return axios.post(baseUrl + 'users', payload)
}
export const updateUser = (id, payload) => {
  return axios.put(baseUrl + `users/${id}`, payload)
}

export const deleteUser = (id) => {
  return axios.delete(baseUrl + `users/${id}`)
}

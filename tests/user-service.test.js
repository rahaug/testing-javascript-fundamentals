import * as service from '../src/user-service'
import axios from 'axios'

const baseUrl = 'https://reqres.in/api/'

jest.mock('axios')

afterEach(() => {
  jest.clearAllMocks()
})

it('requests the correct endpoint when getting users', () => {
  service.getUsers()
  expect(axios.get).toHaveBeenCalledWith('https://reqres.in/api/users')
})

it('requests the correct endpoint when getting a specific users', () => {
  service.getUser(1337)
  expect(axios.get).toHaveBeenCalledWith('https://reqres.in/api/users/1337')
  expect(axios.get).toHaveBeenCalledTimes(1)
})

it('requests the correct endpoint when creating a user', () => {
  const payload = { first_name: 'Bruce', last_name: 'Wayne' }
  service.storeUser(payload)
  expect(axios.post).toHaveBeenCalledWith(
    'https://reqres.in/api/users',
    payload
  )
})

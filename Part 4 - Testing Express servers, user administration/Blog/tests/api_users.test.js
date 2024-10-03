const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const helper = require('./tests_helper')

const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await helper.initializeUsers()
})

// - When there is initially some users saved
//     - Users are returned as json
//     - All users are returned
describe('when there is initially some users saved', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    assert.strictEqual(response.body.length, helper.users.length)

    const usernames = response.body.map(r => r.username)
    helper.users.forEach(user => {
      assert(usernames.includes(user.username))
    })
  })
})

// - Adding a valid user
//     - Succeeds with a new user
//     - Succeeds with a unique username
//     - Fails with statuscode 400 if username is taken
//     - Fails with statuscode 400 if username is missing
//     - Fails with statuscode 400 if password is missing
//     - Fails with statuscode 400 if password is less than 3 characters long
describe('adding a valid user', () => {
  test('succeeds with a new user', async () => {
    const newUser = {
      username: 'username3',
      name: 'name3',
      password: 'password3'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.users.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('succeeds with a unique username', async () => {
    const newUser = {
      username: 'username3',
      name: 'name3',
      password: 'password3'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.users.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('fails with statuscode 400 if username is taken', async () => {
    const newUser = {
      username: 'username1',
      name: 'name3',
      password: 'password3'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('fails with statuscode 400 if username is missing', async () => {
    const newUser = {
      name: 'name3',
      password: 'password3'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('fails with statuscode 400 if password is missing', async () => {
    const newUser = {
      username: 'username3',
      name: 'name3',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('fails with statuscode 400 if password is less than 3 characters long', async () => {
    const newUser = {
      username: 'username3',
      name: 'name3',
      password: 'pa'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

// - Viewing a specific user
//     - Succeeds with a valid id
//     - Fails with statuscode 404 if user does not exist
describe('viewing a specific user', () => {
  test('succeeds with a valid id', async () => {
    const usersAtStart = await helper.usersInDb()
    const userToView = usersAtStart[0]

    const resultUser = await api
      .get(`/api/users/${userToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedUserToView = JSON.parse(JSON.stringify(userToView))
    assert.deepStrictEqual(resultUser.body, processedUserToView)
  })

  test('fails with statuscode 404 if user does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/users/${validNonexistingId}`)
      .expect(404)
  })
})


after(() => {
  mongoose.connection.close()
})
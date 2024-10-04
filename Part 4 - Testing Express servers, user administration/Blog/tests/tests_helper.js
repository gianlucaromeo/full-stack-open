const User = require('../models/user')
const Blog = require('../models/blog')

const jwt = require('jsonwebtoken')

const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const users = [
  {
    username: 'username1',
    name: 'name1',
    password: 'password1'
  },
  {
    username: 'username2',
    name: 'name2',
    password: 'password2'
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const nonExistingUserId = async () => {
  const user = new User({
    username: 'temporary',
    name: 'temporary',
    password: 'temporary'
  })

  await user.save()
  const id = user._id
  await User.findByIdAndDelete(id)
  return id
}

const initializeUsers = async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(users[0])
  await api.post('/api/users').send(users[1])
}

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'Test blog',
    author: 'Test Author',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 1,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

const initializeBlogs = async () => {
  const users = await usersInDb()
  const firstUserId = users[0].id

  await Blog.deleteMany({})

  const blogObjects = blogs.map(blog => new Blog({
    ...blog,
    user: firstUserId
  }))

  const promiseArray = blogObjects.map(blog => blog.save())

  await Promise.all(promiseArray)
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const loginFirstUserAndGetToken = async () => {
  const response = await api.post('/api/login').send({
    username: users[0].username,
    password: users[0].password
  })
  return response.body.token
}

const userIdFromToken = async (token) => {
  const decodedToken = await jwt.verify(token, process.env.SECRET)
  return decodedToken.id
}

module.exports = {
  users,
  usersInDb,
  nonExistingUserId,
  initializeUsers,
  blogs,
  blogsInDb,
  initializeBlogs,
  loginFirstUserAndGetToken,
  userIdFromToken
}
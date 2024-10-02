const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./blogs_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.blogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('there is a correct number of blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.blogs.length)
})

test(
  'the unique identifier property of the blog posts is named id',
  async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id)
  }
)

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'New Author',
    url: 'https://test.com/',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.blogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes('New Blog'))

  const likes = blogsAtEnd.map(blog => blog.likes)
  assert(likes.includes(10))

  const authors = blogsAtEnd.map(blog => blog.author)
  assert(authors.includes('New Author'))
})

test('if the likes property is missing from the request, it will default to 0', async () => {
  const newBlogWithoutLikes = {
    title: 'New Blog',
    author: 'New Author',
    url: 'https://test.com/',
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.blogs.length + 1)

  const likes = blogsAtEnd.map(blog => blog.likes)
  assert(likes.includes(0))
})


after(async () => {
  await mongoose.connection.close()
})
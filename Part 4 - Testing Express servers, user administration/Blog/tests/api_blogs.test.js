const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./tests_helper')

beforeEach(async () => {
  await helper.initializeUsers()
  await helper.initializeBlogs()
})

test('there is a correct number of blogs', async () => {
  const token = await helper.loginFirstUserAndGetToken()

  const response = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.blogs.length)
})

test(
  'the unique identifier property of the blog posts is named id',
  async () => {
    const token = await helper.loginFirstUserAndGetToken()

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert(response.body[0].id)
  }
)

test('a valid blog can be added', async () => {
  const token = await helper.loginFirstUserAndGetToken()

  const newBlog = {
    title: 'New Blog',
    author: 'New Author',
    url: 'https://test.com/',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
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

  const urls = blogsAtEnd.map(blog => blog.url)
  assert(urls.includes('https://test.com/'))

  const ids = blogsAtEnd.map(blog => blog.user)
  const userId = await helper.userIdFromToken(token)
  assert(ids.map((idObject) => idObject.toString()).includes(userId))
})

test('if the likes property is missing from the request, it will default to 0', async () => {
  const token = await helper.loginFirstUserAndGetToken()

  const newBlogWithoutLikes = {
    title: 'New Blog',
    author: 'New Author',
    url: 'https://test.com/',
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutLikes)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.blogs.length + 1)

  const likes = blogsAtEnd.map(blog => blog.likes)
  assert(likes.includes(0))
})

test('if the title is missing the backend respons with 400', async () => {
  const token = await helper.loginFirstUserAndGetToken()

  const newBlogWithoutTitle = {
    author: 'New Author',
    url: 'https://test.com/',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .set('Authorization', `Bearer ${token}`)
    .expect(400)
})

test('if the url is missing the backend respons with 400', async () => {
  const token = await helper.loginFirstUserAndGetToken()

  const newBlogWithoutTitle = {
    author: 'New Author',
    title: 'New Title',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .set('Authorization', `Bearer ${token}`)
    .expect(400)
})

test('a blog can be deleted from the user who created it', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  const token = await helper.loginFirstUserAndGetToken()
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(!titles.includes(blogToDelete.title))
})

test('a blog can be updated from the user who created it', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    title: 'Updated Title',
    author: 'Updated Author',
    url: 'https://updated.com/',
    likes: 20,
  }

  const token = await helper.loginFirstUserAndGetToken()

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(updatedBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.blogs.length)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes('Updated Title'))

  const likes = blogsAtEnd.map(blog => blog.likes)
  assert(likes.includes(20))

  const authors = blogsAtEnd.map(blog => blog.author)
  assert(authors.includes('Updated Author'))

  const urls = blogsAtEnd.map(blog => blog.url)
  assert(urls.includes('https://updated.com/'))

  const ids = blogsAtEnd.map(blog => blog.id)
  assert(ids.includes(blogToUpdate.id))
})


after(async () => {
  await mongoose.connection.close()
})
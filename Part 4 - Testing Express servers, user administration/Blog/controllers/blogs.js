const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
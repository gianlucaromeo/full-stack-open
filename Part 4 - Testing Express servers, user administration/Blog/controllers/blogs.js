const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const userId = request.user

  const blogs = await Blog.find({ user: userId }).populate('user', {
    username: 1,
    name: 1,
    id: 1
  })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const userId = request.user

  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: userId
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const userId = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== userId.toString()) {
    return response.status(401).json({ error: 'unauthorized user' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true }
  )

  response.json(updatedBlog)
})

module.exports = blogsRouter
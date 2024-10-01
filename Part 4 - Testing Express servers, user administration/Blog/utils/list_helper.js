// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const reducer = (favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  }

  const { title, author, likes } = blogs.reduce(reducer, { likes: -1 })

  return {
    title,
    author,
    likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
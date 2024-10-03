const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('./tests_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '1a000b3a1b54a676234d17f8',
    title: 'Test blog',
    author: 'Test Author',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

// TOTAL LIKES
describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(helper.totalLikes([]), 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    assert.strictEqual(helper.totalLikes([blogs[0]]), 7)
  })

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(helper.totalLikes(blogs), 48)
  })
})

// FAVORITE BLOG
describe('favorite blog', () => {
  test('of empty list is null', () => {
    assert.strictEqual(helper.favoriteBlog([]), null)
  })

  test('when list has only one blog equals the properties of that', () => {
    const result = helper.favoriteBlog(blogs.slice(0, 1))
    const expected = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    }
    assert.deepStrictEqual(result, expected)
  })

  test('of a bigger list is calculated correctly', () => {
    const result = helper.favoriteBlog(blogs)
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    assert.deepStrictEqual(result, expected)
  })

  test('of a bigger list with two blogs with same likes, the first one in the list is returned', () => {
    const result = helper.favoriteBlog(blogs)
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    assert.deepStrictEqual(result, expected)
  })
})

// MOST BLOGS
describe('most blogs', () => {
  test('of empty list equals null', () => {
    const result = helper.mostBlogs([])
    const expected = null

    assert.deepStrictEqual(result, expected)
  })

  test('when list has only one blog equals that one', () => {
    const result = helper.mostBlogs([blogs[0]])
    const expected = {
      author: blogs[0].author,
      blogs: 1,
    }

    assert.deepStrictEqual(result, expected)
  })

  test('of a bigger list is calculated right', () => {
    const result = helper.mostBlogs(blogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3,
    }

    assert.deepStrictEqual(result, expected)
  })
})

// MOST LIKES
describe('most likes', () => {
  test('of empty list equals null', () => {
    const result = helper.mostLikes([])
    const expected = null

    assert.deepStrictEqual(result, expected)
  })

  test('when list has only one blog equals that one', () => {
    const result = helper.mostLikes([blogs[0]])
    const expected = {
      author: blogs[0].author,
      likes: blogs[0].likes,
    }

    assert.deepStrictEqual(result, expected)
  })

  test('of a bigger list is calculated right', () => {
    const result = helper.mostLikes(blogs)
    const expected = {
      'author': 'Edsger W. Dijkstra',
      'likes': 17
    }

    assert.deepStrictEqual(result, expected)
  })
})

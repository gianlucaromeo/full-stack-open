const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page
      .getByRole('heading', { name: 'Log in to application' })
    ).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url')
      await expect(page.getByText('test title')).toBeVisible()
    })

    test('and a blog can be liked', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByTestId('likes')).toHaveText('1')
    })

    test('and a blog can be deleted', async ({ page }) => {
      page.on('dialog', async dialog => {
        expect(dialog.message())
          .toContain('Remove blog test title by test author?')
        await dialog.accept()
      })

      await createBlog(page, 'test title', 'test author', 'test url')
      await expect(page.getByText('test title')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'Delete' }).click()
      await expect(page.getByText('test title')).not.toBeVisible()
    })
  })

  describe('When logged in as another user', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('/api/users', {
        data: {
          name: 'Test User',
          username: 'testuser',
          password: 'testpass'
        }
      })
      await loginWith(page, 'testuser', 'testpass')
      await createBlog(page, 'test title 1', 'test author 1', 'test url 1')
    })

    test('only the creator can see the delete button', async ({ page }) => {

      // Test user can see the blog
      await expect(page.getByText('test title 1')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'Delete' }))
        .toBeVisible()

      // Logout
      await page.getByRole('button', { name: 'logout' }).click()

      // Login with user 1
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('test title 1')).not.toBeVisible()
    })
  })

  describe('When multiple blogs are created', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, 'test title 1', 'test author 1', 'test url 1')
      await createBlog(page, 'test title 2', 'test author 2', 'test url 2')
      await createBlog(page, 'test title 3', 'test author 3', 'test url 3')
    })

    test('blogs are ordered by likes', async ({ page }) => {
      await expect(page.getByText('test title 1')).toBeVisible()
      await expect(page.getByText('test title 2')).toBeVisible()
      await expect(page.getByText('test title 3')).toBeVisible()

      // Open all views
      await page.getByTestId('view-btn-test title 1').click()
      await page.getByTestId('view-btn-test title 2').click()
      await page.getByTestId('view-btn-test title 3').click()

      await likeBlog(page, 'test title 1') // 1:1, 2:0, 3:0

      // Expect test title 1 to be first by getting text by likes
      await expect(page.getByTestId('likes').first()).toHaveText('1')
      await expect(page.getByTestId('likes').nth(1)).toHaveText('0')
      await expect(page.getByTestId('likes').nth(2)).toHaveText('0')

      // Press like twice for test title 2
      await likeBlog(page, 'test title 2') // 1:1, 2:1, 3:0
      await likeBlog(page, 'test title 2') // 1:1, 2:2, 3:0

      // Expect test title 2 to be first now because of likes
      await expect(page.getByTestId('likes').first()).toHaveText('2')
      await expect(page.getByTestId('likes').nth(1)).toHaveText('1')
      await expect(page.getByTestId('likes').nth(2)).toHaveText('0')

    })
  })


})
const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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

  // Make a test that ensures that only the user who added the blog sees the blog's delete button.
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


})
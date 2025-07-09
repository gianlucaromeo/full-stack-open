const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
  await page.waitForTimeout(300)
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
  await page.getByText(title).waitFor()
}

const likeBlog = async (page, title) => {
  // Check if the like button is visible or not
  if (await page.getByTestId(`like-btn-${title}`).isVisible()) {
    await page.getByTestId(`like-btn-${title}`).click()
  } else {
    await page.getByTestId(`view-btn-${title}`).click()
    await page.getByTestId(`like-btn-${title}`).click()
  }
  await page.waitForTimeout(1000)
}

module.exports = { loginWith, createBlog, likeBlog }
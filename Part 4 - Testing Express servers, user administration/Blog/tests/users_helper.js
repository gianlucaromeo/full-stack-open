const User = require('../models/user')

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

const nonExistingId = async () => {
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
  let userObject = new User(users[0])
  await userObject.save()
  userObject = new User(users[1])
  await userObject.save()
}

module.exports = { users, usersInDb, nonExistingId, initializeUsers }
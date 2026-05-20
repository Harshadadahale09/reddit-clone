const express =
  require('express')

const router =
  express.Router()

const {

  getUserProfile,
  getUserPosts,
  updateAvatar

} = require(
  '../controllers/userController'
)

// User Profile
router.get(
  '/:id',
  getUserProfile
)

// User Posts
router.get(
  '/:id/posts',
  getUserPosts
)

// Update Avatar
router.put(
  '/:id/avatar',
  updateAvatar
)

module.exports =
  router
const express = require('express')

const router = express.Router()

const {

  getUserProfile,
  getUserPosts

} = require('../controllers/userController')

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

module.exports = router
const express = require('express')

const router = express.Router()

const {
  createPost,
  getPosts,
  getSinglePost,
  deletePost,
  editPost,
  searchPosts
} = require(
  '../controllers/postController'
)

const protect =
  require('../middleware/authMiddleware')

router.post(
  '/',
  createPost
)

router.get(
  '/',
  getPosts
)

router.get(
  '/search/posts',
  searchPosts
)

router.get(
  '/:id',
  getSinglePost
)

router.put(
  '/:id',
  editPost
)

router.delete(
  '/:id',
  deletePost
)

module.exports = router
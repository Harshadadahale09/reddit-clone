const express = require('express')

const router = express.Router()

const {
  createComment,
  getComments,
  deleteComment,
  editComment
} = require(
  '../controllers/commentController'
)

const protect =
  require('../middleware/authMiddleware')

router.post(
  '/',
  createComment
)

router.get(
  '/:postId',
  getComments
)

router.put(
  '/:id',
  editComment
)

router.delete(
  '/:id',
  deleteComment
)

module.exports = router
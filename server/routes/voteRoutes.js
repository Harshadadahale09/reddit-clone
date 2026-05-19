const express = require('express')

const router = express.Router()

const {
  votePost,
  getVotes
} = require('../controllers/voteController')

const protect =
  require('../middleware/authMiddleware')

router.post(
  '/',
  protect,
  votePost
)

router.get('/:postId', getVotes)

module.exports = router
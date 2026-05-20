const express =
  require('express')

const router =
  express.Router()

const {

  votePost,
  getVotes

} = require(
  '../controllers/voteController'
)

router.post(
  '/',
  votePost
)

router.get(
  '/:postId',
  getVotes
)

module.exports =
  router
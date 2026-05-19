const express =
  require('express')

const router =
  express.Router()

const {

  toggleSavePost,
  getSavedPosts

} = require(
  '../controllers/savedPostController'
)

router.post(
  '/',
  toggleSavePost
)

router.get(
  '/:userId',
  getSavedPosts
)

module.exports =
  router
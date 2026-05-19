const express =
  require('express')

const router =
  express.Router()

const communityController =
  require('../controllers/communityController')

router.post(
  '/',
  communityController.createCommunity
)

router.get(
  '/',
  communityController.getCommunities
)

/* IMPORTANT */

router.get(
  '/:id/posts',
  communityController.getCommunityPosts
)

router.get(
  '/:id',
  communityController.getCommunityById
)

module.exports =
  router
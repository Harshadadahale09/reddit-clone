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

/* COMMUNITY POSTS */

router.get(
  '/:id/posts',
  communityController.getCommunityPosts
)

/* SINGLE COMMUNITY */

router.get(
  '/:id',
  communityController.getCommunityById
)

/* UPDATE COMMUNITY IMAGES */

router.put(
  '/:id/images',
  communityController.updateCommunityImages
)

module.exports =
  router
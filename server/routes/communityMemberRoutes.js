const express =
  require('express')

const router =
  express.Router()

const {

  toggleMembership,
  getCommunityMembers,
  checkMembership

} = require(
  '../controllers/communityMemberController'
)

/* CHECK JOIN STATUS */

router.get(
  '/check/status',
  checkMembership
)

/* JOIN / LEAVE */

router.post(
  '/',
  toggleMembership
)

/* MEMBERS COUNT */

router.get(
  '/:id',
  getCommunityMembers
)

module.exports =
  router
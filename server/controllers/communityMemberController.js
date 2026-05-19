const prisma =
  require('../config/prisma')

/* JOIN / LEAVE */

exports.toggleMembership =
  async (req, res) => {

    try {

      const {
        userId,
        communityId
      } = req.body

      const existing =
        await prisma.communityMember.findFirst({

          where: {

            userId,
            communityId

          }

        })

      /* LEAVE */

      if (existing) {

        await prisma.communityMember.delete({

          where: {
            id: existing.id
          }

        })

        return res.json({

          joined: false

        })
      }

      /* JOIN */

      await prisma.communityMember.create({

        data: {

          userId,
          communityId

        }

      })

      res.json({

        joined: true

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        error: error.message

      })

    }
  }

/* MEMBERS COUNT */

exports.getCommunityMembers =
  async (req, res) => {

    try {

      const { id } =
        req.params

      const members =
        await prisma.communityMember.count({

          where: {

            communityId: id

          }

        })

      res.json({

        members

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        error: error.message

      })

    }
  }

/* CHECK MEMBERSHIP */

exports.checkMembership =
  async (req, res) => {

    try {

      const {
        userId,
        communityId
      } = req.query

      const existing =
        await prisma.communityMember.findFirst({

          where: {

            userId,
            communityId

          }

        })

      res.json({

        joined: !!existing

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        error: error.message

      })

    }
  }
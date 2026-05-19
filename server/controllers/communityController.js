const prisma =
  require('../config/prisma')

exports.createCommunity =
  async (req, res) => {

    try {

      const {
        name,
        slug
      } = req.body

      const community =
        await prisma.community.create({

          data: {
            name,
            slug
          }

        })

      res.json(community)

    } catch (error) {

      console.log(error)

      res.status(500).json({
        error: error.message
      })

    }
  }

exports.getCommunities =
  async (req, res) => {

    try {

      const communities =
        await prisma.community.findMany({

          orderBy: {
            createdAt: 'desc'
          }

        })

      res.json(communities)

    } catch (error) {

      res.status(500).json({
        error: error.message
      })

    }
  }

exports.getCommunityById =
  async (req, res) => {

    try {

      const { id } =
        req.params

      const community =
        await prisma.community.findUnique({

          where: { id }

        })

      res.json(community)

    } catch (error) {

      res.status(500).json({
        error: error.message
      })

    }
  }

exports.getCommunityPosts =
  async (req, res) => {

    try {

      const { id } =
        req.params

      const posts =
        await prisma.post.findMany({

          where: {
            communityId: id
          },

          include: {
            author: true,
            community: true,
            comments: true
          },

          orderBy: {
            createdAt: 'desc'
          }

        })

      res.json(posts)

    } catch (error) {

      res.status(500).json({
        error: error.message
      })

    }
  }
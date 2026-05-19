const prisma =
  require('../config/prisma')

exports.getUserProfile =
  async (req, res) => {

    try {

      const { id } =
        req.params

      const user =
        await prisma.user.findUnique({

          where: { id }

        })

      if (!user) {

        return res.status(404).json({

          message: 'User not found'

        })

      }

      const posts =
        await prisma.post.findMany({

          where: {

            authorId: id

          },

          orderBy: {

            createdAt: 'desc'

          }

        })

      res.json({

        user,
        posts

      })

    } catch (error) {

      res.status(500).json({

        error: error.message

      })

    }
  }

exports.getUserPosts =
  async (req, res) => {

    try {

      const { id } =
        req.params

      const posts =
        await prisma.post.findMany({

          where: {

            authorId: id

          },

          include: {

            author: true,
            community: true,
            votes: true

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
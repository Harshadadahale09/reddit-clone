const prisma =
  require('../config/prisma')

exports.toggleSavePost =
  async (req, res) => {

    try {

      const {
        userId,
        postId
      } = req.body

      const existingSave =
        await prisma.savedPost.findUnique({

          where: {

            userId_postId: {
              userId,
              postId
            }

          }

        })

      if (existingSave) {

        await prisma.savedPost.delete({

          where: {
            id: existingSave.id
          }

        })

        return res.json({

          saved: false

        })
      }

      await prisma.savedPost.create({

        data: {
          userId,
          postId
        }

      })

      res.json({

        saved: true

      })

    } catch (error) {

      res.status(500).json({

        error: error.message

      })

    }
  }

exports.getSavedPosts =
  async (req, res) => {

    try {

      const { userId } =
        req.params

      const savedPosts =
        await prisma.savedPost.findMany({

          where: {
            userId
          },

          include: {

            post: {
              include: {
                author: true,
                community: true
              }
            }

          }

        })

      res.json(savedPosts)

    } catch (error) {

      res.status(500).json({

        error: error.message

      })

    }
  }
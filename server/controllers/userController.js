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

          include: {
            author: true,
            community: true,
            votes: true,
            comments: true
          },

          orderBy: {
            createdAt: 'desc'
          }

        })

      const karma =
        posts.reduce((total, post) => {

          const postVotes =
            post.votes.reduce(
              (sum, vote) =>
                sum + vote.type,
              0
            )

          return total + postVotes

        }, 0)

      res.json({
        user,
        posts,
        karma
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
            votes: true,
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

  exports.updateAvatar =
  async (req, res) => {

    try {

      const { id } =
        req.params

      const { avatar } =
        req.body

      const updatedUser =
        await prisma.user.update({

          where: {
            id
          },

          data: {
            avatar
          }

        })

      res.json(updatedUser)

    } catch (error) {

      console.log(error)

      res.status(500).json({

        error: error.message

      })

    }
  }
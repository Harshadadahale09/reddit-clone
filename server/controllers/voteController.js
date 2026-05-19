const prisma = require('../config/prisma')

exports.votePost = async (req, res) => {

  try {

    const {
      userId,
      postId,
      type
    } = req.body

    const existingVote =
      await prisma.vote.findFirst({

        where: {
          userId,
          postId
        }

      })

    if (existingVote) {

      await prisma.vote.update({

        where: {
          id: existingVote.id
        },

        data: {
          type
        }

      })

      return res.json({

        message: 'Vote updated'

      })
    }

    await prisma.vote.create({

      data: {
        userId,
        postId,
        type
      }

    })

    const post =
      await prisma.post.findUnique({

        where: {
          id: postId
        }

      })

    if (
      post &&
      post.authorId !== userId &&
      type === 1
    ) {

      await prisma.notification.create({

        data: {

          type: 'vote',

          message:
            'Someone upvoted your post',

          userId:
            post.authorId

        }

      })

    }

    res.json({

      message: 'Vote added'

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      error: error.message

    })
  }
}

exports.getVotes = async (req, res) => {

  try {

    const { postId } =
      req.params

    const votes =
      await prisma.vote.findMany({

        where: {
          postId
        }

      })

    const totalVotes =
      votes.reduce(
        (acc, vote) =>
          acc + vote.type,
        0
      )

    res.json({

      totalVotes

    })

  } catch (error) {

    res.status(500).json({

      error: error.message

    })
  }
}
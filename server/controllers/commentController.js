const prisma = require('../config/prisma')

exports.createComment = async (
  req,
  res
) => {

  try {

    const {
      content,
      postId,
      authorId
    } = req.body

    const comment =
      await prisma.comment.create({

        data: {
          content,
          postId,
          authorId
        },

        include: {
          author: true
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
      post.authorId !== authorId
    ) {

      await prisma.notification.create({

        data: {

          type: 'comment',

          message:
            'Someone commented on your post',

          userId:
            post.authorId

        }

      })

    }

    res.status(201).json(comment)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      error: error.message

    })
  }
}

exports.getComments = async (
  req,
  res
) => {

  try {

    const { postId } = req.params

    const comments =
      await prisma.comment.findMany({

        where: {
          postId
        },

        include: {
          author: true
        },

        orderBy: {
          createdAt: 'desc'
        }

      })

    res.json(comments)

  } catch (error) {

    res.status(500).json({

      error: error.message

    })
  }
}

exports.deleteComment = async (
  req,
  res
) => {

  try {

    const { id } = req.params

    await prisma.comment.delete({

      where: {
        id
      }

    })

    res.json({

      message:
        'Comment deleted successfully'

    })

  } catch (error) {

    res.status(500).json({

      error: error.message

    })
  }
}

exports.editComment = async (
  req,
  res
) => {

    try {

      const { id } = req.params

      const { content } =
        req.body

      const updatedComment =
        await prisma.comment.update({

          where: {
            id
          },

          data: {
            content
          }

        })

      res.json(updatedComment)

    } catch (error) {

      res.status(500).json({

        error: error.message

      })
    }
  }
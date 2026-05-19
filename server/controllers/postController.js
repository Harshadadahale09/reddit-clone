const prisma = require('../config/prisma')

exports.createPost = async (
  req,
  res
) => {

  try {

    const {
      title,
      content,
      imageUrl,
      communityId,
      authorId
    } = req.body

    const post =
      await prisma.post.create({

        data: {
          title,
          content,
          imageUrl,
          communityId,
          authorId
        }

      })

    res.status(201).json(post)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }
}

exports.getPosts = async (
  req,
  res
) => {

  try {

    const { sort } = req.query

    const posts =
      await prisma.post.findMany({

        include: {
          community: true,
          author: true,
          votes: true,
          comments: true
        }

      })

    const formattedPosts =
      posts.map((post) => ({

        ...post,

        voteCount:
          post.votes.reduce(
            (acc, vote) =>
              acc + vote.type,
            0
          )

      }))

    if (sort === 'popular') {

      formattedPosts.sort(
        (a, b) =>
          b.voteCount -
          a.voteCount
      )

    } else {

      formattedPosts.sort(
        (a, b) =>
          new Date(
            b.createdAt
          ) -
          new Date(
            a.createdAt
          )
      )
    }

    res.json(formattedPosts)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }
}

exports.getSinglePost = async (
  req,
  res
) => {

  try {

    const { id } = req.params

    const post =
      await prisma.post.findUnique({

        where: {
          id
        },

        include: {
          community: true,
          author: true,
          comments: true,
          votes: true
        }

      })

    if (!post) {

      return res.status(404).json({

        message:
          'Post not found'

      })
    }

    res.json(post)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }
}

exports.deletePost = async (
  req,
  res
) => {

  try {

    const { id } = req.params

    // Delete Votes
    await prisma.vote.deleteMany({

      where: {
        postId: id
      }

    })

    // Delete Comments
    await prisma.comment.deleteMany({

      where: {
        postId: id
      }

    })

    // Delete Post
    await prisma.post.delete({

      where: {
        id
      }

    })

    res.json({

      message:
        'Post deleted successfully'

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      error: error.message

    })
  }
}

exports.editPost = async (
  req,
  res
) => {

  try {

    const { id } = req.params

    const {
      title,
      content
    } = req.body

    const updatedPost =
      await prisma.post.update({

        where: {
          id
        },

        data: {
          title,
          content
        }

      })

    res.json(updatedPost)

  } catch (error) {

    res.status(500).json({

      error: error.message

    })
  }
}

exports.searchPosts = async (
  req,
  res
) => {

  try {

    const { query } = req.query

    const posts =
      await prisma.post.findMany({

        where: {

          OR: [

            {
              title: {
                contains: query,
                mode: 'insensitive'
              }
            },

            {
              content: {
                contains: query,
                mode: 'insensitive'
              }
            }

          ]

        },

        include: {
          community: true,
          author: true,
          votes: true,
          comments: true
        }

      })

    res.json(posts)

  } catch (error) {

    res.status(500).json({

      error: error.message

    })
  }
}
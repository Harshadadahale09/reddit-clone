require('dotenv').config()

const express =
  require('express')

const cors =
  require('cors')

const prisma =
  require('./config/prisma')

const messageRoutes =
  require('./routes/messageRoutes')

const notificationRoutes =
  require('./routes/notificationRoutes')

const authRoutes =
  require('./routes/authRoutes')

const communityMemberRoutes =
  require('./routes/communityMemberRoutes')

const communityRoutes =
  require('./routes/communityRoutes')

const postRoutes =
  require('./routes/postRoutes')

const voteRoutes =
  require('./routes/voteRoutes')

const commentRoutes =
  require('./routes/commentRoutes')

const userRoutes =
  require('./routes/userRoutes')

const uploadRoutes =
  require('./routes/uploadRoutes')

const savedPostRoutes =
  require('./routes/savedPostRoutes')

const app =
  express()

app.use(cors())

app.use(express.json())

/* ONLINE STATUS */

app.use(async (
  req,
  res,
  next
) => {

  try {

    const userId =
      req.headers.userid

    if (userId) {

      await prisma.user.update({

        where: {
          id: userId
        },

        data: {
          isOnline: true
        }

      })

    }

  } catch (error) {

    console.log(error)

  }

  next()

})

/* AUTH ROUTES */

app.use(
  '/api/auth',
  authRoutes
)

/* COMMUNITY ROUTES */

app.use(
  '/api/communities',
  communityRoutes
)

/* COMMUNITY MEMBERS */

app.use(
  '/api/community-members',
  communityMemberRoutes
)

/* POSTS */

app.use(
  '/api/posts',
  postRoutes
)

/* VOTES */

app.use(
  '/api/votes',
  voteRoutes
)

/* COMMENTS */

app.use(
  '/api/comments',
  commentRoutes
)

/* USERS */

app.use(
  '/api/users',
  userRoutes
)

/* UPLOAD */

app.use(
  '/api/upload',
  uploadRoutes
)

/* SAVED POSTS */

app.use(
  '/api/saved-posts',
  savedPostRoutes
)

/* NOTIFICATIONS */

app.use(
  '/api/notifications',
  notificationRoutes
)

/* CHAT */

app.use(
  '/api/messages',
  messageRoutes
)

/* TEST ROUTE */

app.get('/', (
  req,
  res
) => {

  res.send(
    'API Running'
  )

})

/* SERVER */

app.listen(
  process.env.PORT,
  () => {

    console.log(
      `Server running on ${process.env.PORT}`
    )

  }
)
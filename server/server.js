require('dotenv').config()

const express = require('express')
const cors = require('cors')
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

const app = express()

app.use(cors())
app.use(express.json())

// Auth Routes
app.use('/api/auth', authRoutes)

// Community Routes
app.use(
  '/api/communities',
  communityRoutes
)

// Community Members Routes
app.use(
  '/api/community-members',
  communityMemberRoutes
)

// Post Routes
app.use('/api/posts', postRoutes)

// Vote Routes
app.use('/api/votes', voteRoutes)

// Comment Routes
app.use(
  '/api/comments',
  commentRoutes
)

// User Routes
app.use('/api/users', userRoutes)

// Upload Routes
app.use('/api/upload', uploadRoutes)

// Saved Posts Routes
app.use(
  '/api/saved-posts',
  savedPostRoutes
)
app.use(
  '/api/notifications',
  notificationRoutes
)

// Test Route
app.get('/', (req, res) => {

  res.send('API Running')

})

// Server Start
app.listen(process.env.PORT, () => {

  console.log(
    `Server running on ${process.env.PORT}`
  )

})
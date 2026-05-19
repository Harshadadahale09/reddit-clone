const prisma =
  require('../config/prisma')

/* GET USER NOTIFICATIONS */

exports.getNotifications =
  async (req, res) => {

    try {

      const { userId } =
        req.params

      const notifications =
        await prisma.notification.findMany({

          where: {
            userId
          },

          orderBy: {
            createdAt: 'desc'
          }

        })

      res.json(notifications)

    } catch (error) {

      res.status(500).json({

        error: error.message

      })

    }
  }

/* MARK AS READ */

exports.markAsRead =
  async (req, res) => {

    try {

      const { id } =
        req.params

      const notification =
        await prisma.notification.update({

          where: {
            id
          },

          data: {
            isRead: true
          }

        })

      res.json(notification)

    } catch (error) {

      res.status(500).json({

        error: error.message

      })

    }
  }
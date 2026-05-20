const prisma =
  require('../config/prisma')

exports.sendMessage =
  async (req, res) => {

    try {

      const {
        content,
        senderId
      } = req.body

      const message =
        await prisma.message.create({

          data: {
            content,
            senderId
          },

          include: {
            sender: true
          }

        })

      res.status(201).json(message)

    } catch (error) {

      console.log(error)

      res.status(500).json({

        error: error.message

      })

    }
  }

exports.getMessages =
  async (req, res) => {

    try {

      const messages =
        await prisma.message.findMany({

          include: {
            sender: true
          },

          orderBy: {
            createdAt: 'asc'
          }

        })

      res.json(messages)

    } catch (error) {

      console.log(error)

      res.status(500).json({

        error: error.message

      })

    }
  }
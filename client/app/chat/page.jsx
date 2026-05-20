'use client'

import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import Navbar
from '../components/Navbar'

export default function ChatPage() {

  const [messages, setMessages] =
    useState([])

  const [content, setContent] =
    useState('')

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    fetchMessages()

    const interval =
      setInterval(() => {

        fetchMessages()

      }, 2000)

    return () =>
      clearInterval(interval)

  }, [])

  const fetchMessages =
    async () => {

      try {

        const res =
          await axios.get(
            'http://localhost:5000/api/messages'
          )

        setMessages(res.data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }
    }

  const sendMessage =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem('user')
          )

        if (!user) {

          alert('Login required')

          return
        }

        if (!content.trim()) return

        await axios.post(
          'http://localhost:5000/api/messages',
          {
            content,
            senderId: user.id
          }
        )

        setContent('')

        fetchMessages()

      } catch (error) {

        console.log(error)

      }
    }

  return (

    <div className="bg-gray-100 dark:bg-black min-h-screen">

      <Navbar />

      <div className="max-w-3xl mx-auto p-5">

        <div className="bg-white dark:bg-gray-900 dark:border-gray-800 border rounded-2xl overflow-hidden shadow-lg">

          <div className="p-5 border-b dark:border-gray-800 flex items-center justify-between">

            <h1 className="text-2xl font-bold dark:text-white">

              Community Chat

            </h1>

            <span className="text-sm text-green-500 font-semibold">

              Live

            </span>

          </div>

          <div className="h-[500px] overflow-y-auto p-5 space-y-4">

            {loading ? (

              <div className="text-center text-gray-500">

                Loading messages...

              </div>

            ) : messages.length === 0 ? (

              <div className="text-center text-gray-500">

                No messages yet

              </div>

            ) : (

              messages.map((message) => (

                <div
                  key={message.id}
                  className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4"
                >

                  <div className="flex items-center gap-2 mb-2">

                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">

                      {message.sender.username.charAt(0)}

                    </div>

                    <div>

                      <p className="font-semibold text-sm text-orange-500">

                        u/{message.sender.username}

                      </p>

                      <p className="text-xs text-gray-500">

                        {new Date(
                          message.createdAt
                        ).toLocaleTimeString()}

                      </p>

                    </div>

                  </div>

                  <p className="dark:text-white break-words">

                    {message.content}

                  </p>

                </div>

              ))

            )}

          </div>

          <div className="p-4 border-t dark:border-gray-800 flex gap-2">

            <input
              type="text"
              placeholder="Write message..."
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === 'Enter') {

                  sendMessage()

                }

              }}
              className="flex-1 border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-full outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-full transition"
            >

              Send

            </button>

          </div>

        </div>

      </div>

    </div>
  )
}
'use client'

import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import {
  useParams,
  useRouter
} from 'next/navigation'

import Navbar
from '../../components/Navbar'

export default function EditPostPage() {

  const params =
    useParams()

  const router =
    useRouter()

  const id =
    params.id

  const [title, setTitle] =
    useState('')

  const [content, setContent] =
    useState('')

  useEffect(() => {

    if (id) {

      fetchPost()

    }

  }, [id])

  const fetchPost =
    async () => {

      try {

        const res =
          await axios.get(

            `http://localhost:5000/api/posts/${id}`

          )

        setTitle(
          res.data.title
        )

        setContent(
          res.data.content
        )

      } catch (error) {

        console.log(error)

      }
    }

  const handleUpdate =
    async () => {

      try {

        await axios.put(

          `http://localhost:5000/api/posts/${id}`,

          {
            title,
            content
          }

        )

        alert('Post updated!')

        router.push('/')

      } catch (error) {

        console.log(error)

        alert('Update failed')

      }
    }

  return (

    <div className="bg-gray-100 dark:bg-black min-h-screen">

      <Navbar />

      <div className="max-w-3xl mx-auto p-5">

        <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-6">

          <h1 className="text-3xl font-bold mb-6 dark:text-white">

            Edit Post

          </h1>

          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border dark:border-gray-800 rounded-xl p-3 mb-4 dark:bg-gray-800 dark:text-white"
          />

          <textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            className="w-full border dark:border-gray-800 rounded-xl p-3 h-40 mb-4 resize-none dark:bg-gray-800 dark:text-white"
          />

          <button
            onClick={handleUpdate}
            className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600"
          >

            Update Post

          </button>

        </div>

      </div>

    </div>
  )
}
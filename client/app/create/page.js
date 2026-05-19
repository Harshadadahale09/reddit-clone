'use client'

import { useState } from 'react'

import axios from 'axios'

export default function CreatePost() {

  const [title, setTitle] =
    useState('')

  const [content, setContent] =
    useState('')

  const [image, setImage] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault()

    try {

      setLoading(true)

      let imageUrl = ''

      // Upload Image
      if (image) {

        const formData =
          new FormData()

        formData.append(
          'image',
          image
        )

        const uploadRes =
          await axios.post(

            'http://localhost:5000/api/upload',

            formData
          )

        imageUrl =
          uploadRes.data.imageUrl
      }

      // Create Post
      await axios.post(
        'http://localhost:5000/api/posts',

        {
          title,
          content,
          imageUrl,

          communityId:
  'cmozru8qb0000vg0cf74t1u8d',

          authorId:
  JSON.parse(
    localStorage.getItem('user')
  ).id
        }
      )

      alert('Post created!')

      setTitle('')
      setContent('')
      setImage(null)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="min-h-screen bg-gray-100 p-5">

      <div className="max-w-2xl mx-auto bg-white p-5 rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-5">
          Create Post
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            className="w-full border p-3 rounded h-32"
          />

          <input
            type="file"
            onChange={(e) =>
              setImage(
                e.target.files[0]
              )
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white px-5 py-3 rounded"
          >

            {loading
              ? 'Uploading...'
              : 'Create Post'}

          </button>

        </form>

      </div>

    </div>
  )
}
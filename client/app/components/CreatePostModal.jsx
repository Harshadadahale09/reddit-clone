'use client'

import { useEffect, useState }
from 'react'

import axios from 'axios'

import {
  X
} from 'lucide-react'

export default function CreatePostModal({
  isOpen,
  onClose,
  refreshPosts
}) {

  const [title, setTitle] =
    useState('')

  const [content, setContent] =
    useState('')

  const [imageUrl, setImageUrl] =
    useState('')

  const [communityId, setCommunityId] =
    useState('')

  const [communities, setCommunities] =
    useState([])

  useEffect(() => {

    fetchCommunities()

  }, [])

  const fetchCommunities = async () => {

    try {

      const res =
        await axios.get(
          'http://localhost:5000/api/communities'
        )

      setCommunities(res.data)

    } catch (error) {

      console.log(error)

    }
  }

  const handleCreatePost =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem('user')
          )

        await axios.post(

          'http://localhost:5000/api/posts',

          {
            title,
            content,
            imageUrl,
            communityId,
            authorId: user.id
          }

        )

        alert('Post Created!')

        setTitle('')
        setContent('')
        setImageUrl('')
        setCommunityId('')

        refreshPosts()

        onClose()

      } catch (error) {

        console.log(error)

      }
    }

  if (!isOpen) return null

  return (

    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative">

        {/* CLOSE */}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-gray-100 p-2 rounded-full"
        >

          <X size={20} />

        </button>

        {/* TITLE */}

        <h2 className="text-2xl font-bold mb-5">

          Create Post

        </h2>

        {/* COMMUNITY */}

        <select
          value={communityId}
          onChange={(e) =>
            setCommunityId(
              e.target.value
            )
          }
          className="border p-3 rounded-xl w-full mb-4"
        >

          <option value="">
            Select Community
          </option>

          {communities.map(
            (community) => (

              <option
                key={community.id}
                value={community.id}
              >

                {community.name}

              </option>

            )
          )}

        </select>

        {/* TITLE */}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="border p-3 rounded-xl w-full mb-4"
        />

        {/* CONTENT */}

        <textarea
          placeholder="Text"
          value={content}
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          rows={6}
          className="border p-3 rounded-xl w-full mb-4"
        />

        {/* IMAGE URL */}

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) =>
            setImageUrl(
              e.target.value
            )
          }
          className="border p-3 rounded-xl w-full mb-5"
        />

        {/* BUTTON */}

        <button
          onClick={handleCreatePost}
          className="bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-3 rounded-full font-semibold"
        >

          Create Post

        </button>

      </div>

    </div>
  )
}
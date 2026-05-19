'use client'

import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import { useRouter }
from 'next/navigation'

import Navbar
from '../components/Navbar'

export default function CreatePostPage() {

  const router =
    useRouter()

  const [title, setTitle] =
    useState('')

  const [content, setContent] =
    useState('')

  const [communityId, setCommunityId] =
    useState('')

  const [communities, setCommunities] =
    useState([])

  const [imageUrl, setImageUrl] =
    useState('')

  const [uploading, setUploading] =
    useState(false)

  useEffect(() => {

    fetchCommunities()

  }, [])

  const fetchCommunities =
    async () => {

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

  /* IMAGE UPLOAD */

  const handleImageUpload =
    async (e) => {

      try {

        setUploading(true)

        const file =
          e.target.files[0]

        const formData =
          new FormData()

        formData.append(
          'image',
          file
        )

        const res =
          await axios.post(

            'http://localhost:5000/api/upload',

            formData

          )

        setImageUrl(
          res.data.imageUrl
        )

      } catch (error) {

        console.log(error)

        alert('Image upload failed')

      } finally {

        setUploading(false)

      }
    }

  /* CREATE POST */

  const handleCreatePost =
    async () => {

      try {

        if (
          !title ||
          !content ||
          !communityId
        ) {

          alert(
            'Please fill all fields'
          )

          return
        }

        const user =
          JSON.parse(
            localStorage.getItem('user')
          )

        if (!user) {

          alert('Please login first')

          return
        }

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

        alert('Post created!')

        router.push(
          `/community/${communityId}`
        )

      } catch (error) {

        console.log(error)

        alert('Failed to create post')

      }
    }

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-3xl mx-auto p-5">

        <div className="bg-white rounded-2xl border p-6">

          <h1 className="text-3xl font-bold mb-6">

            Create Post

          </h1>

          {/* COMMUNITY */}

          <select
            value={communityId}
            onChange={(e) =>
              setCommunityId(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3 mb-4"
          >

            <option value="">
              Select Community
            </option>

            {communities.map((community) => (

              <option
                key={community.id}
                value={community.id}
              >

                c/{community.name}

              </option>

            ))}

          </select>

          {/* TITLE */}

          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border rounded-xl p-3 mb-4"
          />

          {/* CONTENT */}

          <textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            className="w-full border rounded-xl p-3 h-40 mb-4 resize-none"
          />

          {/* IMAGE */}

          <div className="mb-4">

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />

          </div>

          {/* PREVIEW */}

          {imageUrl && (

            <img
              src={imageUrl}
              alt="preview"
              className="rounded-2xl mb-4 max-h-80 object-cover"
            />

          )}

          {/* BUTTON */}

          <button
            onClick={handleCreatePost}
            disabled={uploading}
            className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600"
          >

            {uploading
              ? 'Uploading...'
              : 'Create Post'}

          </button>

        </div>

      </div>

    </div>
  )
}
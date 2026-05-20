'use client'

import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import {
  useParams
} from 'next/navigation'

import Navbar from '../components/Navbar'
import CommentSection from '../components/CommentSection'

export default function SinglePostPage() {

  const params = useParams()

  const id = params.id

  const [post, setPost] = useState(null)

  useEffect(() => {

    if (id) {
      fetchPost()
    }

  }, [id])

  const fetchPost = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/posts/${id}`
      )

      setPost(res.data)

    } catch (error) {

      console.log(error)

    }
  }

  if (!post) {

    return (
      <div className="p-10 text-xl">
        Loading...
      </div>
    )
  }

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-4xl mx-auto p-5">

        <div className="bg-white rounded-2xl border p-6">

          <p className="text-sm text-gray-500 mb-2">
            c/{post.community?.name}
          </p>

          <h1 className="text-4xl font-bold mb-4">
            {post.title}
          </h1>

          <p className="text-gray-500 mb-5">
            Posted by u/{post.author?.username}
          </p>

          <p className="text-lg text-gray-700 mb-6">
            {post.content}
          </p>

          {post.imageUrl && (

            <img
              src={post.imageUrl}
              alt="post"
              className="rounded-2xl w-full mb-6"
            />

          )}

          <CommentSection
            postId={post.id}
          />

        </div>

      </div>

    </div>
  )
}
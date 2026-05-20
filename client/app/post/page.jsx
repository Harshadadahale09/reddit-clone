'use client'

import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import {
  useParams
} from 'next/navigation'

import Navbar
from '../../components/Navbar'

import CommentSection
from '../../components/CommentSection'

export default function SinglePostPage() {

  const params =
    useParams()

  const id =
    params.id

  const [post, setPost] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

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

            `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`

          )

        setPost(res.data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }
    }

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">

        Loading...

      </div>

    )
  }

  if (!post) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">

        Post not found

      </div>

    )
  }

  return (

    <div className="bg-gray-100 dark:bg-black min-h-screen">

      <Navbar />

      <div className="max-w-4xl mx-auto p-5">

        <div className="bg-white dark:bg-gray-900 dark:border-gray-800 rounded-2xl border p-6 shadow-sm">

          {/* COMMUNITY */}

          <p className="text-sm text-gray-500 mb-2">

            c/{post.community?.name}

          </p>

          {/* TITLE */}

          <h1 className="text-4xl font-bold mb-4 dark:text-white">

            {post.title}

          </h1>

          {/* AUTHOR */}

          <p className="text-gray-500 mb-5">

            Posted by u/{post.author?.username}

          </p>

          {/* CONTENT */}

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-wrap">

            {post.content}

          </p>

          {/* IMAGE */}

          {post.imageUrl && (

            <img
              src={post.imageUrl}
              alt="post"
              className="rounded-2xl w-full mb-6 max-h-[600px] object-cover"
            />

          )}

          {/* COMMENTS */}

          <CommentSection
            postId={post.id}
          />

        </div>

      </div>

    </div>
  )
}
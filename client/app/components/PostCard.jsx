'use client'

import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import Link from 'next/link'

import {

  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Pencil,
  Trash2

} from 'lucide-react'

import CommentSection
from './CommentSection'

export default function PostCard({
  post
}) {

  const [votes, setVotes] =
    useState(0)

  const [saved, setSaved] =
    useState(false)

  const [openMenu, setOpenMenu] =
    useState(false)

  const [currentUser, setCurrentUser] =
    useState(null)

  const [isDeleted, setIsDeleted] =
    useState(false)

  useEffect(() => {

    fetchVotes()

    const user =
      JSON.parse(
        localStorage.getItem('user')
      )

    setCurrentUser(user)

  }, [])

  const fetchVotes = async () => {

    try {

      const res =
        await axios.get(
          `http://localhost:5000/api/votes/${post.id}`
        )

      setVotes(
        res.data.totalVotes || 0
      )

    } catch (error) {

      console.log(error)

    }
  }

  const handleVote = async (
    type
  ) => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem('user')
        )

      if (!user) {

        alert('Please login first')

        return
      }

      await axios.post(
        'http://localhost:5000/api/votes',
        {
          userId: user.id,
          postId: post.id,
          type
        }
      )

      fetchVotes()

    } catch (error) {

      console.log(error)

    }
  }

  const handleShare = () => {

    navigator.clipboard.writeText(
      `${window.location.origin}/post/${post.id}`
    )

    alert('Post link copied!')
  }

  const handleSave = async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem('user')
        )

      const res =
        await axios.post(
          'http://localhost:5000/api/saved-posts',
          {
            userId: user.id,
            postId: post.id
          }
        )

      setSaved(
        res.data.saved
      )

    } catch (error) {

      console.log(error)

    }
  }

  const handleDelete =
    async () => {

      try {

        const confirmDelete =
          confirm(
            'Delete this post?'
          )

        if (!confirmDelete) return

        await axios.delete(
          `http://localhost:5000/api/posts/${post.id}`
        )

        setIsDeleted(true)

      } catch (error) {

        console.log(error)

        alert('Delete failed')

      }
    }

  if (isDeleted) {

    return null

  }

  return (

    <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl overflow-hidden hover:border-gray-400 transition mb-5">

      <div className="flex">

        {/* VOTES */}

        <div className="bg-gray-50 dark:bg-gray-800 p-3 flex flex-col items-center">

          <button
            type="button"
            onClick={() =>
              handleVote(1)
            }
            className="hover:text-orange-500 dark:text-white cursor-pointer transition"
          >

            <ArrowBigUp size={24} />

          </button>

          <span className="font-bold text-sm dark:text-white my-1">

            {votes}

          </span>

          <button
            type="button"
            onClick={() =>
              handleVote(-1)
            }
            className="hover:text-blue-500 dark:text-white cursor-pointer transition"
          >

            <ArrowBigDown size={24} />

          </button>

        </div>

        {/* CONTENT */}

        <div className="flex-1 p-4">

          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">

            <div className="flex items-center gap-2">

              <Link
                href={`/community/${post.communityId}`}
                className="font-semibold text-black dark:text-white hover:underline"
              >

                c/{post.community?.name}

              </Link>

              <span>•</span>

              <span>

                Posted by u/{post.author?.username}

              </span>

            </div>

            {currentUser?.id === post.authorId && (

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu(!openMenu)
                  }
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full"
                >

                  <MoreHorizontal size={18} />

                </button>

                {openMenu && (

                  <div className="absolute right-0 top-10 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl shadow-lg w-40 overflow-hidden z-50">

                    <Link
                      href={`/edit-post/${post.id}`}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >

                      <Pencil size={16} />

                      Edit

                    </Link>

                    <button
                      type="button"
                      onClick={handleDelete}
                      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 text-left text-red-500"
                    >

                      <Trash2 size={16} />

                      Delete

                    </button>

                  </div>

                )}

              </div>

            )}

          </div>

          <Link
            href={`/post/${post.id}`}
            className="text-xl font-bold mb-3 block hover:underline dark:text-white"
          >

            {post.title}

          </Link>

          <p className="text-gray-700 dark:text-gray-300 mb-4">

            {post.content}

          </p>

          {post.imageUrl && (

            <img
              src={post.imageUrl}
              alt="post"
              className="rounded-xl w-full max-h-[500px] object-cover mb-4"
            />

          )}

          {/* ACTIONS */}

          <div className="flex items-center gap-5 text-gray-500 text-sm">

            <button className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-full transition">

              <MessageCircle size={18} />

              {post.comments?.length || 0} Comments

            </button>

            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-full transition"
            >

              <Share2 size={18} />

              Share

            </button>

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-full transition"
            >

              <Bookmark size={18} />

              {saved ? 'Saved' : 'Save'}

            </button>

          </div>

          {/* COMMENTS */}

          <div className="mt-5">

            <CommentSection
              postId={post.id}
            />

          </div>

        </div>

      </div>

    </div>
  )
}
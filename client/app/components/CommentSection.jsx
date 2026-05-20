'use client'

import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

export default function CommentSection({
  postId
}) {

  const [comments, setComments] =
    useState([])

  const [content, setContent] =
    useState('')

  const [editingId, setEditingId] =
    useState(null)

  const [editContent, setEditContent] =
    useState('')

  const [replyingId, setReplyingId] =
    useState(null)

  const [replyContent, setReplyContent] =
    useState('')

  useEffect(() => {

    fetchComments()

  }, [])

  const fetchComments = async () => {

    try {

      const res =
        await axios.get(
          `http://localhost:5000/api/comments/${postId}`
        )

      setComments(res.data)

    } catch (error) {

      console.log(error)

    }
  }

  const addComment = async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem('user')
        )

      if (!user) {

        alert('Login Required')

        return
      }

      if (!content.trim()) return

      await axios.post(
        'http://localhost:5000/api/comments',
        {
          content,
          postId,
          authorId: user.id
        }
      )

      setContent('')

      fetchComments()

    } catch (error) {

      console.log(error)

    }
  }

  const addReply = async (
    parentId
  ) => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem('user')
        )

      if (!user) {

        alert('Login Required')

        return
      }

      if (!replyContent.trim()) return

      await axios.post(
        'http://localhost:5000/api/comments',
        {
          content: replyContent,
          postId,
          authorId: user.id,
          parentId
        }
      )

      setReplyContent('')

      setReplyingId(null)

      fetchComments()

    } catch (error) {

      console.log(error)

    }
  }

  const deleteComment =
    async (id) => {

      try {

        await axios.delete(
          `http://localhost:5000/api/comments/${id}`
        )

        fetchComments()

      } catch (error) {

        console.log(error)

      }
    }

  const editComment =
    async (id) => {

      try {

        await axios.put(
          `http://localhost:5000/api/comments/${id}`,
          {
            content: editContent
          }
        )

        setEditingId(null)

        fetchComments()

      } catch (error) {

        console.log(error)

      }
    }

  return (

    <div className="mt-4">

      <div className="flex gap-2 mb-4">

        <input
          type="text"
          placeholder="Write comment..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="border p-2 rounded w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />

        <button
          onClick={addComment}
          className="bg-blue-500 text-white px-4 rounded"
        >

          Add

        </button>

      </div>

      <div>

        {comments.map((comment) => (

          <div
            key={comment.id}
            className="border rounded p-3 mb-3 bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          >

            {editingId === comment.id ? (

              <div className="flex gap-2 mb-2">

                <input
                  type="text"
                  value={editContent}
                  onChange={(e) =>
                    setEditContent(
                      e.target.value
                    )
                  }
                  className="border p-2 rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />

                <button
                  onClick={() =>
                    editComment(comment.id)
                  }
                  className="bg-green-500 text-white px-3 rounded"
                >

                  Save

                </button>

              </div>

            ) : (

              <p className="dark:text-white">

                {comment.content}

              </p>

            )}

            <span className="text-sm text-gray-500 block mb-2">

              {comment.author.username}

            </span>

            <div className="flex gap-2 flex-wrap">

              <button
                onClick={() =>
                  setReplyingId(
                    replyingId === comment.id
                      ? null
                      : comment.id
                  )
                }
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >

                Reply

              </button>

              {JSON.parse(
                localStorage.getItem('user')
              )?.id === comment.authorId && (

                <>

                  <button
                    onClick={() => {

                      setEditingId(
                        comment.id
                      )

                      setEditContent(
                        comment.content
                      )

                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >

                    Edit

                  </button>

                  <button
                    onClick={() =>
                      deleteComment(
                        comment.id
                      )
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >

                    Delete

                  </button>

                </>

              )}

            </div>

            {replyingId === comment.id && (

              <div className="flex gap-2 mt-3">

                <input
                  type="text"
                  placeholder="Write reply..."
                  value={replyContent}
                  onChange={(e) =>
                    setReplyContent(
                      e.target.value
                    )
                  }
                  className="border p-2 rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />

                <button
                  onClick={() =>
                    addReply(comment.id)
                  }
                  className="bg-green-500 text-white px-4 rounded"
                >

                  Reply

                </button>

              </div>

            )}

            {comment.replies?.length > 0 && (

              <div className="ml-6 mt-4 border-l-2 border-gray-300 pl-4 space-y-3">

                {comment.replies.map((reply) => (

                  <div
                    key={reply.id}
                    className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded p-3"
                  >

                    <p className="dark:text-white">

                      {reply.content}

                    </p>

                    <span className="text-xs text-gray-500">

                      {reply.author.username}

                    </span>

                  </div>

                ))}

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  )
}
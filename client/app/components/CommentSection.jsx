'use client'

import { useEffect, useState } from 'react'

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

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {

    try {

      const res = await axios.get(
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

  const deleteComment = async (
    id
  ) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/comments/${id}`
      )

      fetchComments()

    } catch (error) {

      console.log(error)

    }
  }

  const editComment = async (
    id
  ) => {

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
          className="border p-2 rounded w-full"
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
            className="border rounded p-2 mb-2 bg-gray-50"
          >

            {editingId === comment.id ? (

              <div className="flex gap-2 mb-2">

                <input
                  type="text"
                  value={editContent}
                  onChange={(e) =>
                    setEditContent(e.target.value)
                  }
                  className="border p-2 rounded w-full"
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

              <p>{comment.content}</p>

            )}

            <span className="text-sm text-gray-500 block mb-2">

              {comment.author.username}

            </span>

            {JSON.parse(
              localStorage.getItem('user')
            )?.id === comment.authorId && (

              <div className="flex gap-2">

                <button
                  onClick={() => {

                    setEditingId(comment.id)

                    setEditContent(
                      comment.content
                    )

                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteComment(comment.id)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete Comment
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  )
}
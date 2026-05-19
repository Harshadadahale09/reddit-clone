'use client'

import { useEffect, useState } from 'react'

import axios from 'axios'

import { useParams } from 'next/navigation'

export default function ProfilePage() {

  const params = useParams()

  const [user, setUser] =
    useState(null)

  const [posts, setPosts] =
    useState([])

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/users/${params.id}`
      )

      setUser(res.data.user)

      setPosts(res.data.posts)

    } catch (error) {
      console.log(error)
    }
  }

  if (!user) {
    return (
      <div className="p-10">
        Loading...
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen p-5">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white p-5 rounded-lg shadow mb-5">

          <h1 className="text-3xl font-bold">
            {user.username}
          </h1>

          <p className="text-gray-500 mt-2">
            {user.email}
          </p>

        </div>

        <h2 className="text-2xl font-bold mb-4">
          User Posts
        </h2>

        {posts.map((post) => (

          <div
            key={post.id}
            className="bg-white p-5 rounded-lg shadow mb-4"
          >

            <h3 className="text-xl font-bold">
              {post.title}
            </h3>

            <p className="mt-2 text-gray-700">
              {post.content}
            </p>

          </div>

        ))}

      </div>
    </div>
  )
}
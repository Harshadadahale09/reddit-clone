'use client'

import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import Navbar
from '../components/Navbar'

import LeftSidebar
from '../components/LeftSidebar'

import RightSidebar
from '../components/RightSidebar'

import PostCard
from '../components/PostCard'

export default function ProfilePage() {

  const [user, setUser] =
    useState(null)

  const [posts, setPosts] =
    useState([])

  const [karma, setKarma] =
    useState(0)

  const [loading, setLoading] =
    useState(true)

  const [uploading, setUploading] =
    useState(false)

  useEffect(() => {

    const storedUser =
      localStorage.getItem('user')

    if (storedUser) {

      const parsedUser =
        JSON.parse(storedUser)

      fetchUserProfile(
        parsedUser.id
      )

    } else {

      setLoading(false)

    }

  }, [])

  const fetchUserProfile =
    async (userId) => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/users/${userId}`
          )

        setUser(
          res.data.user
        )

        setPosts(
          res.data.posts
        )

        setKarma(
          res.data.karma || 0
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }
    }

  const handleAvatarUpload =
    async (e) => {

      try {

        const file =
          e.target.files[0]

        if (!file) return

        setUploading(true)

        const formData =
          new FormData()

        formData.append(
          'image',
          file
        )

        const uploadRes =
          await axios.post(

            'http://localhost:5000/api/upload',

            formData

          )

        const imageUrl =
          uploadRes.data.imageUrl

        const res =
          await axios.put(

            `http://localhost:5000/api/users/${user.id}/avatar`,

            {
              avatar: imageUrl
            }

          )

        setUser(res.data)

        localStorage.setItem(
          'user',
          JSON.stringify(res.data)
        )

        alert(
          'Avatar updated!'
        )

      } catch (error) {

        console.log(error)

        alert(
          'Upload failed'
        )

      } finally {

        setUploading(false)

      }
    }

  return (

    <div className="bg-gray-100 dark:bg-black min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto p-5">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

          <div className="hidden lg:block">

            <LeftSidebar />

          </div>

          <div className="lg:col-span-2">

            <div className="bg-white dark:bg-gray-900 dark:border-gray-800 rounded-2xl border overflow-hidden mb-5">

              <div className="h-32 bg-orange-500" />

              <div className="p-5">

                <div className="flex items-center gap-4 -mt-16">

                  <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 p-1">

                    <label className="w-full h-full rounded-full overflow-hidden cursor-pointer block relative">

                      {user?.avatar ? (

                        <img
                          src={user.avatar}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />

                      ) : (

                        <div className="w-full h-full rounded-full bg-orange-500 text-white flex items-center justify-center text-4xl font-bold">

                          {user?.username?.charAt(0)}

                        </div>

                      )}

                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={
                          handleAvatarUpload
                        }
                      />

                    </label>

                  </div>

                  <div className="mt-10">

                    <h1 className="text-3xl font-bold dark:text-white">

                      u/{user?.username}

                    </h1>

                    <p className="text-gray-500">

                      {user?.email}

                    </p>

                    {uploading && (

                      <p className="text-sm text-orange-500 mt-1">

                        Uploading...

                      </p>

                    )}

                  </div>

                </div>

                <div className="flex gap-10 mt-6">

                  <div>

                    <p className="font-bold text-xl dark:text-white">

                      {posts.length}

                    </p>

                    <p className="text-gray-500 text-sm">

                      Posts

                    </p>

                  </div>

                  <div>

                    <p className="font-bold text-xl dark:text-white">

                      {karma}

                    </p>

                    <p className="text-gray-500 text-sm">

                      Karma

                    </p>

                  </div>

                  <div>

                    <p className="font-bold text-xl dark:text-white">

                      {user?.createdAt
                        ? new Date(user.createdAt).getFullYear()
                        : '2025'}

                    </p>

                    <p className="text-gray-500 text-sm">

                      Joined

                    </p>

                  </div>

                </div>

              </div>

            </div>

            <h2 className="text-2xl font-bold mb-5 dark:text-white">

              My Posts

            </h2>

            {loading ? (

              <div className="bg-white dark:bg-gray-900 dark:border-gray-800 rounded-2xl border p-10 text-center text-gray-500">

                Loading...

              </div>

            ) : posts.length === 0 ? (

              <div className="bg-white dark:bg-gray-900 dark:border-gray-800 rounded-2xl border p-10 text-center text-gray-500">

                No posts yet

              </div>

            ) : (

              posts.map((post) => (

                <PostCard
                  key={post.id}
                  post={post}
                />

              ))

            )}

          </div>

          <div className="hidden lg:block">

            <RightSidebar />

          </div>

        </div>

      </div>

    </div>
  )
}
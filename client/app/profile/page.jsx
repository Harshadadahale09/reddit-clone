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

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const storedUser =
      localStorage.getItem('user')

    if (storedUser) {

      const parsedUser =
        JSON.parse(storedUser)

      setUser(parsedUser)

      fetchUserPosts(
        parsedUser.id
      )

    }

  }, [])

  const fetchUserPosts =
    async (userId) => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/users/${userId}/posts`
          )

        setPosts(res.data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }
    }

  return (

    <div className="bg-gray-100 dark:bg-black min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto p-5">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

          {/* LEFT */}

          <div className="hidden lg:block">

            <LeftSidebar />

          </div>

          {/* MAIN */}

          <div className="lg:col-span-2">

            {/* PROFILE HEADER */}

            <div className="bg-white dark:bg-gray-900 dark:border-gray-800 rounded-2xl border overflow-hidden mb-5">

              {/* BANNER */}

              <div className="h-32 bg-orange-500" />

              {/* USER INFO */}

              <div className="p-5">

                <div className="flex items-center gap-4 -mt-16">

                  {/* AVATAR */}

                  <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 p-1">

                    <div className="w-full h-full rounded-full bg-orange-500 text-white flex items-center justify-center text-4xl font-bold">

                      {user?.username?.charAt(0)}

                    </div>

                  </div>

                  {/* DETAILS */}

                  <div className="mt-10">

                    <h1 className="text-3xl font-bold dark:text-white">

                      u/{user?.username}

                    </h1>

                    <p className="text-gray-500">

                      {user?.email}

                    </p>

                  </div>

                </div>

                {/* STATS */}

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

                      1.2k

                    </p>

                    <p className="text-gray-500 text-sm">

                      Karma

                    </p>

                  </div>

                  <div>

                    <p className="font-bold text-xl dark:text-white">

                      2025

                    </p>

                    <p className="text-gray-500 text-sm">

                      Joined

                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* USER POSTS */}

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

          {/* RIGHT */}

          <div className="hidden lg:block">

            <RightSidebar />

          </div>

        </div>

      </div>

    </div>
  )
}
'use client'

import { useEffect, useState }
from 'react'

import axios from 'axios'

import Navbar
from '../components/Navbar'

import LeftSidebar
from '../components/LeftSidebar'

import RightSidebar
from '../components/RightSidebar'

import PostCard
from '../components/PostCard'

export default function SavedPage() {

  const [posts, setPosts] =
    useState([])

  useEffect(() => {

    fetchSavedPosts()

  }, [])

  const fetchSavedPosts =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem('user')
          )

        const res =
          await axios.get(

            `http://localhost:5000/api/saved-posts/${user.id}`

          )

        const savedPosts =
          res.data.map(
            (item) => item.post
          )

        setPosts(savedPosts)

      } catch (error) {

        console.log(error)

      }
    }

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto p-5">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

          {/* LEFT SIDEBAR */}

          <div className="hidden lg:block">

            <LeftSidebar />

          </div>

          {/* MAIN */}

          <div className="lg:col-span-2">

            <h1 className="text-3xl font-bold mb-5">

              Saved Posts

            </h1>

            {posts.length === 0 ? (

              <div className="bg-white rounded-2xl border p-10 text-center text-gray-500">

                No saved posts yet

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

          {/* RIGHT SIDEBAR */}

          <div className="hidden lg:block">

            <RightSidebar />

          </div>

        </div>

      </div>

    </div>
  )
}
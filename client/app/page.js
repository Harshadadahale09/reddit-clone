'use client'

import { useEffect, useState }
from 'react'

import axios from 'axios'

import Navbar
from './components/Navbar'

import PostCard
from './components/PostCard'

import LeftSidebar
from './components/LeftSidebar'

import RightSidebar
from './components/RightSidebar'

import CreatePostBox
from './components/CreatePostBox'

import FeedFilter
from './components/FeedFilter'

export default function Home() {

  const [posts, setPosts] =
    useState([])

  const [sort, setSort] =
    useState('latest')

  const [search, setSearch] =
    useState('')

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  useEffect(() => {

    fetchPosts()

  }, [sort, search])

  const fetchPosts = async () => {

    try {

      setLoading(true)
      setError('')

      let url =
        'http://localhost:5000/api/posts'

      if (
        sort === 'popular' ||
        sort === 'top' ||
        sort === 'rising' ||
        sort === 'best'
      ) {

        url =
          'http://localhost:5000/api/posts?sort=popular'
      }

      if (search.trim()) {

        url =
          `http://localhost:5000/api/posts/search/posts?query=${search}`
      }

      const res =
        await axios.get(url)

      setPosts(res.data)

    } catch (error) {

      console.log(error)

      setError('Failed to load posts')

    } finally {

      setLoading(false)

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

            <h1 className="text-3xl font-bold mb-5 dark:text-white">

              Reddit Feed

            </h1>

            <CreatePostBox
              refreshPosts={fetchPosts}
            />

            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border dark:border-gray-800 p-3 rounded-full w-full mb-5 bg-white dark:bg-gray-900 dark:text-white"
            />

            <FeedFilter
              sort={sort}
              setSort={setSort}
            />

            {loading && (

              <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-8 text-center text-gray-500">

                Loading posts...

              </div>

            )}

            {error && !loading && (

              <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-8 text-center text-red-500">

                {error}

              </div>

            )}

            {!loading && !error && posts.length === 0 && (

              <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-8 text-center text-gray-500">

                No posts found

              </div>

            )}

            {!loading && !error && posts.map((post) => (

              <PostCard
                key={post.id}
                post={post}
              />

            ))}

          </div>

          <div className="hidden lg:block">

            <RightSidebar />

          </div>

        </div>

      </div>

    </div>
  )
}
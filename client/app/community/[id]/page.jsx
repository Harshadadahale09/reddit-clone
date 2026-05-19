'use client'

import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import { useParams }
from 'next/navigation'

import Navbar
from '../../components/Navbar'

import PostCard
from '../../components/PostCard'

export default function CommunityPage() {

  const params =
    useParams()

  const id =
    params.id

  const [posts, setPosts] =
    useState([])

  const [community, setCommunity] =
    useState(null)

  const [joined, setJoined] =
    useState(false)

  const [members, setMembers] =
    useState(0)

  useEffect(() => {

    if (id) {

      fetchCommunityPosts()

      fetchCommunityInfo()

      fetchMembers()

      checkJoinedStatus()

    }

  }, [id])

  /* POSTS */

  const fetchCommunityPosts =
    async () => {

      try {

        const res =
          await axios.get(

            `http://localhost:5000/api/communities/${id}/posts`

          )

        setPosts(res.data)

      } catch (error) {

        console.log(error)

      }
    }

  /* COMMUNITY */

  const fetchCommunityInfo =
    async () => {

      try {

        const res =
          await axios.get(

            `http://localhost:5000/api/communities/${id}`

          )

        setCommunity(res.data)

      } catch (error) {

        console.log(error)

      }
    }

  /* MEMBERS */

  const fetchMembers =
    async () => {

      try {

        const res =
          await axios.get(

            `http://localhost:5000/api/community-members/${id}`

          )

        setMembers(
          res.data.members
        )

      } catch (error) {

        console.log(error)

      }
    }

  /* CHECK JOINED */

  const checkJoinedStatus =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem('user')
          )

        if (!user) return

        const res =
          await axios.get(

            `http://localhost:5000/api/community-members/check/status?userId=${user.id}&communityId=${id}`

          )

        setJoined(
          res.data.joined
        )

      } catch (error) {

        console.log(error)

      }
    }

  /* JOIN / LEAVE */

  const handleJoin =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem('user')
          )

        if (!user) {

          alert('Please login first')

          return
        }

        const res =
          await axios.post(

            'http://localhost:5000/api/community-members',

            {
              userId: user.id,
              communityId: id
            }

          )

        setJoined(
          res.data.joined
        )

        fetchMembers()

      } catch (error) {

        console.log(error)

        alert('Join failed')

      }
    }

  return (

    <div className="bg-gray-100 dark:bg-black min-h-screen">

      <Navbar />

      {/* BANNER */}

      <div className="h-40 bg-orange-500" />

      <div className="max-w-5xl mx-auto p-5">

        {/* COMMUNITY CARD */}

        <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-6 mb-5 -mt-20 relative z-[100]">

          <div className="flex items-center justify-between">

            {/* LEFT */}

            <div className="flex items-center gap-4">

              {/* ICON */}

              <div className="w-20 h-20 rounded-full bg-orange-500 border-4 border-white flex items-center justify-center text-white text-3xl font-bold">

                {community?.name?.charAt(0)}

              </div>

              {/* INFO */}

              <div>

                <h1 className="text-3xl font-bold dark:text-white">

                  c/{community?.name}

                </h1>

                <p className="text-gray-500">

                  {members} members

                </p>

              </div>

            </div>

            {/* BUTTON */}

            <button
              type="button"
              onClick={handleJoin}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                joined
                  ? 'bg-gray-300 text-black'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >

              {joined
                ? 'Joined'
                : 'Join'}

            </button>

          </div>

        </div>

        {/* POSTS */}

        {posts.map((post) => (

          <PostCard
            key={post.id}
            post={post}
          />

        ))}

      </div>

    </div>
  )
}
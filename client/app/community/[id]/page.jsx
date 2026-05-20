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

  const [uploading, setUploading] =
    useState(false)

  useEffect(() => {

    if (id) {

      fetchCommunityPosts()

      fetchCommunityInfo()

      fetchMembers()

      checkJoinedStatus()

    }

  }, [id])

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

  const uploadImage =
    async (file) => {

      const formData =
        new FormData()

      formData.append(
        'image',
        file
      )

      const res =
        await axios.post(

          'http://localhost:5000/api/upload',

          formData

        )

      return res.data.imageUrl
    }

  const handleBannerUpload =
    async (e) => {

      try {

        const file =
          e.target.files[0]

        if (!file) return

        setUploading(true)

        const imageUrl =
          await uploadImage(file)

        const res =
          await axios.put(

            `http://localhost:5000/api/communities/${id}/images`,

            {
              banner: imageUrl,
              icon:
                community?.icon
            }

          )

        setCommunity(res.data)

      } catch (error) {

        console.log(error)

      } finally {

        setUploading(false)

      }
    }

  const handleIconUpload =
    async (e) => {

      try {

        const file =
          e.target.files[0]

        if (!file) return

        setUploading(true)

        const imageUrl =
          await uploadImage(file)

        const res =
          await axios.put(

            `http://localhost:5000/api/communities/${id}/images`,

            {
              icon: imageUrl,
              banner:
                community?.banner
            }

          )

        setCommunity(res.data)

      } catch (error) {

        console.log(error)

      } finally {

        setUploading(false)

      }
    }

  return (

    <div className="bg-gray-100 dark:bg-black min-h-screen">

      <Navbar />

      <div className="relative">

        <label className="block cursor-pointer">

          {community?.banner ? (

            <img
              src={community.banner}
              alt="banner"
              className="h-40 w-full object-cover"
            />

          ) : (

            <div className="h-40 bg-orange-500" />

          )}

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={
              handleBannerUpload
            }
          />

        </label>

      </div>

      <div className="max-w-5xl mx-auto p-5">

        <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-6 mb-5 -mt-20 relative z-[100]">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-orange-500">

                <label className="cursor-pointer block w-full h-full">

                  {community?.icon ? (

                    <img
                      src={community.icon}
                      alt="icon"
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">

                      {community?.name?.charAt(0)}

                    </div>

                  )}

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={
                      handleIconUpload
                    }
                  />

                </label>

              </div>

              <div>

                <h1 className="text-3xl font-bold dark:text-white">

                  c/{community?.name}

                </h1>

                <p className="text-gray-500">

                  {members} members

                </p>

                {uploading && (

                  <p className="text-sm text-orange-500 mt-1">

                    Uploading...

                  </p>

                )}

              </div>

            </div>

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
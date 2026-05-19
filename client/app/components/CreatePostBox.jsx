'use client'

import {
  useEffect,
  useState
} from 'react'

import {
  Image,
  Link2
} from 'lucide-react'

import CreatePostModal
from './CreatePostModal'

export default function CreatePostBox({
  refreshPosts
}) {

  const [user, setUser] =
    useState(null)

  const [openModal, setOpenModal] =
    useState(false)

  useEffect(() => {

    const storedUser =
      localStorage.getItem('user')

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      )

    }

  }, [])

  return (

    <>

      <div className="bg-white rounded-2xl shadow p-4 mb-5">

        <div className="flex items-center gap-3">

          {/* AVATAR */}

          <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">

            {user?.username?.charAt(0)}

          </div>

          {/* INPUT */}

          <button
            onClick={() =>
              setOpenModal(true)
            }
            className="flex-1 bg-gray-100 hover:bg-gray-200 transition px-4 py-3 rounded-full text-left text-gray-500"
          >

            Create Post

          </button>

          {/* IMAGE */}

          <button className="hover:bg-gray-100 p-3 rounded-full">

            <Image size={22} />

          </button>

          {/* LINK */}

          <button className="hover:bg-gray-100 p-3 rounded-full">

            <Link2 size={22} />

          </button>

        </div>

      </div>

      {/* MODAL */}

      <CreatePostModal
        isOpen={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        refreshPosts={refreshPosts}
      />

    </>

  )
}
'use client'

import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import Link from 'next/link'

export default function RightSidebar() {

  const [communities, setCommunities] =
    useState([])

  useEffect(() => {

    fetchCommunities()

  }, [])

  const fetchCommunities =
    async () => {

      try {

        const res =
          await axios.get(
            'http://localhost:5000/api/communities'
          )

        setCommunities(
          res.data.slice(0, 5)
        )

      } catch (error) {

        console.log(error)

      }
    }

  return (

    <div className="sticky top-20 space-y-5">

      <div className="bg-white dark:bg-gray-900 dark:border-gray-800 rounded-2xl border p-5">

        <h2 className="font-bold text-lg mb-4 dark:text-white">

          Trending Communities

        </h2>

        <div className="space-y-4">

          {communities.length === 0 ? (

            <p className="text-sm text-gray-500">

              No communities yet

            </p>

          ) : (

            communities.map((community) => (

              <Link
                key={community.id}
                href={`/community/${community.id}`}
                className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-xl transition"
              >

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">

                    {community.name.charAt(0)}

                  </div>

                  <div>

                    <p className="font-semibold text-sm dark:text-white">

                      c/{community.name}

                    </p>

                    <p className="text-xs text-gray-500">

                      Community

                    </p>

                  </div>

                </div>

                <span className="bg-blue-500 text-white text-sm px-4 py-1 rounded-full">

                  View

                </span>

              </Link>

            ))

          )}

        </div>

      </div>

      <div className="bg-white dark:bg-gray-900 dark:border-gray-800 rounded-2xl border p-5">

        <h2 className="font-bold text-lg mb-4 dark:text-white">

          Community Rules

        </h2>

        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">

          <li>✅ Be respectful</li>
          <li>✅ No spam</li>
          <li>✅ Follow rules</li>
          <li>✅ Healthy discussion</li>

        </ul>

      </div>

      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-5">

        <h2 className="font-bold text-lg mb-2">

          Reddit Premium

        </h2>

        <p className="text-sm mb-4">

          Enjoy ad-free browsing and exclusive features.

        </p>

        <button className="bg-white text-orange-500 px-4 py-2 rounded-full font-semibold hover:bg-gray-100">

          Try Now

        </button>

      </div>

    </div>
  )
}
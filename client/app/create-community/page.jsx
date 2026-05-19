'use client'

import {
  useState
} from 'react'

import axios from 'axios'

import { useRouter }
from 'next/navigation'

import Navbar
from '../components/Navbar'

export default function CreateCommunityPage() {

  const router =
    useRouter()

  const [name, setName] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleCreate =
    async (e) => {

      e.preventDefault()

      try {

        setLoading(true)

        const slug =
          name
            .toLowerCase()
            .replace(/\s+/g, '-')

        const res =
          await axios.post(

            'http://localhost:5000/api/communities',

            {
              name,
              slug
            }

          )

        alert('Community Created')

        router.push(

          `/community/${res.data.id}`

        )

      } catch (error) {

        console.log(error)

        alert('Failed to create community')

      } finally {

        setLoading(false)

      }
    }

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-2xl mx-auto p-5">

        <div className="bg-white rounded-2xl border p-6">

          <h1 className="text-3xl font-bold mb-6">

            Create Community

          </h1>

          <form
            onSubmit={handleCreate}
            className="space-y-5"
          >

            <div>

              <label className="block font-semibold mb-2">

                Community Name

              </label>

              <input
                type="text"
                placeholder="Enter community name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border p-3 rounded-xl outline-none focus:border-orange-500"
                required
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition"
            >

              {loading
                ? 'Creating...'
                : 'Create Community'}

            </button>

          </form>

        </div>

      </div>

    </div>
  )
}
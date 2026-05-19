'use client'

import { useState } from 'react'

import axios from 'axios'

import { useRouter } from 'next/navigation'

export default function SignupPage() {

  const router = useRouter()

  const [username, setUsername] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const handleSignup = async (
    e
  ) => {

    e.preventDefault()

    try {

      await axios.post(
        'http://localhost:5000/api/auth/signup',

        {
          username,
          email,
          password
        }
      )

      alert(
        'Signup Successful'
      )

      router.push('/login')

    } catch (error) {

      console.log(error)

      alert('Signup Failed')

    }
  }

  return (

    <div className="bg-gray-100 min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded"
        >
          Signup
        </button>

      </form>

    </div>
  )
}
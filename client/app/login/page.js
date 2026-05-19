'use client'

import { useState } from 'react'

import axios from 'axios'

import { useRouter } from 'next/navigation'

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const handleLogin = async (
    e
  ) => {

    e.preventDefault()

    try {

      const res = await axios.post(
        'http://localhost:5000/api/auth/login',

        {
          email,
          password
        }
      )

      localStorage.setItem(
        'token',
        res.data.token
      )

      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      )

      alert('Login Successful')

      router.push('/')

    } catch (error) {

      console.log(error)

      alert('Login Failed')

    }
  }

  return (

    <div className="bg-gray-100 min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

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
          Login
        </button>

      </form>

    </div>
  )
}
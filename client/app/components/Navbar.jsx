'use client'

import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import Link from 'next/link'

import {

  Bell,
  Plus,
  Search,
  ChevronDown,
  Bookmark,
  User,
  LogOut,
  MessageCircle,
  Sun,
  Moon

} from 'lucide-react'

export default function Navbar() {

  const [user, setUser] =
    useState(null)

  const [openMenu, setOpenMenu] =
    useState(false)

  const [openNotifications, setOpenNotifications] =
    useState(false)

  const [darkMode, setDarkMode] =
    useState(false)

  const [notifications, setNotifications] =
    useState([])

  useEffect(() => {

    const storedUser =
      localStorage.getItem('user')

    if (storedUser) {

      const parsedUser =
        JSON.parse(storedUser)

      setUser(parsedUser)

      fetchNotifications(
        parsedUser.id
      )
    }

    const savedTheme =
      localStorage.getItem('theme')

    if (savedTheme === 'dark') {

      document.documentElement.classList.add('dark')

      setDarkMode(true)
    }

  }, [])

  const fetchNotifications =
    async (userId) => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/notifications/${userId}`
          )

        setNotifications(res.data)

      } catch (error) {

        console.log(error)

      }
    }

  const markAsRead =
    async (notificationId) => {

      try {

        await axios.put(
          `http://localhost:5000/api/notifications/read/${notificationId}`
        )

        setNotifications((prev) =>
          prev.map((item) =>
            item.id === notificationId
              ? { ...item, isRead: true }
              : item
          )
        )

      } catch (error) {

        console.log(error)

      }
    }

  const unreadCount =
    notifications.filter(
      (item) => !item.isRead
    ).length

  const toggleDarkMode = () => {

    if (darkMode) {

      document.documentElement.classList.remove('dark')

      localStorage.setItem('theme', 'light')

      setDarkMode(false)

    } else {

      document.documentElement.classList.add('dark')

      localStorage.setItem('theme', 'dark')

      setDarkMode(true)
    }
  }

  const handleLogout = () => {

    localStorage.removeItem('user')

    setUser(null)

    window.location.href = '/login'
  }

  return (

    <div className="bg-white dark:bg-black border-b dark:border-gray-800 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between gap-5">

        <Link
          href="/"
          className="text-2xl font-bold text-orange-500"
        >
          RedditClone
        </Link>

        <div className="flex items-center bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-full flex-1 max-w-2xl">

          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search Reddit"
            className="bg-transparent outline-none ml-2 w-full dark:text-white"
          />

        </div>

        {!user ? (

          <div className="flex items-center gap-3">

            <Link
              href="/login"
              className="px-5 py-2 rounded-full border hover:bg-gray-100 transition"
            >

              Login

            </Link>

            <Link
              href="/signup"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full transition"
            >

              Sign Up

            </Link>

          </div>

        ) : (

        <div className="flex items-center gap-4 relative">

          <Link
            href="/create-post"
            className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-orange-600 transition"
          >

            <Plus size={18} />

            Create

          </Link>

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setOpenNotifications(
                  !openNotifications
                )
              }
              className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full relative dark:text-white"
            >

              <Bell size={20} />

              {unreadCount > 0 && (

                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>

              )}

            </button>

            {openNotifications && (

              <div className="absolute right-0 top-12 bg-white dark:bg-black border dark:border-gray-800 rounded-2xl shadow-lg w-80 overflow-hidden z-50">

                <div className="p-4 border-b dark:border-gray-800">

                  <h2 className="font-bold text-lg dark:text-white">

                    Notifications

                  </h2>

                </div>

                <div className="p-2 max-h-96 overflow-y-auto">

                  {notifications.length === 0 ? (

                    <div className="p-5 text-center text-gray-500">

                      No notifications

                    </div>

                  ) : (

                    notifications.map((notification) => (

                      <button
                        key={notification.id}
                        type="button"
                        onClick={() =>
                          markAsRead(notification.id)
                        }
                        className={`w-full text-left flex gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl ${
                          notification.isRead
                            ? ''
                            : 'bg-orange-50 dark:bg-gray-800'
                        }`}
                      >

                        <MessageCircle
                          size={20}
                          className="text-blue-500"
                        />

                        <div>

                          <p className="text-sm font-semibold dark:text-white">

                            {notification.message}

                          </p>

                          <p className="text-xs text-gray-500">

                            {new Date(
                              notification.createdAt
                            ).toLocaleString()}

                          </p>

                        </div>

                      </button>

                    ))

                  )}

                </div>

              </div>

            )}

          </div>

          <button
            type="button"
            onClick={toggleDarkMode}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full dark:text-white"
          >

            {darkMode ? (

              <Sun size={20} />

            ) : (

              <Moon size={20} />

            )}

          </button>

          <button
            type="button"
            onClick={() =>
              setOpenMenu(!openMenu)
            }
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-full dark:text-white"
          >

            <div className="bg-orange-500 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold">

              {user?.username?.charAt(0)}

            </div>

            <ChevronDown size={18} />

          </button>

          {openMenu && (

            <div className="absolute right-0 top-16 bg-white dark:bg-black border dark:border-gray-800 rounded-2xl shadow-lg w-64 overflow-hidden z-50">

              <div className="p-4 border-b dark:border-gray-800">

                <p className="font-bold dark:text-white">

                  u/{user?.username}

                </p>

                <p className="text-sm text-gray-500">

                  {user?.email}

                </p>

              </div>

              <div className="p-2">

                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl dark:text-white"
                >

                  <User size={18} />

                  Profile

                </Link>

                <Link
                  href="/saved"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl dark:text-white"
                >

                  <Bookmark size={18} />

                  Saved Posts

                </Link>

                <Link
                  href="/create-community"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl dark:text-white"
                >

                  <Plus size={18} />

                  Create Community

                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl text-left dark:text-white"
                >

                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            </div>

          )}

        </div>

        )}

      </div>

    </div>
  )
}
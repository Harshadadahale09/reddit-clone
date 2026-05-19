'use client'

import {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

import Link from 'next/link'

import {
  Home,
  Flame,
  Compass,
  Newspaper,
  Trophy,
  Gamepad2,
  Plus,
  Users,
  Info,
  Briefcase,
  HelpCircle,
  FileText,
  Megaphone
} from 'lucide-react'

export default function LeftSidebar() {

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

        setCommunities(res.data)

      } catch (error) {

        console.log(error)

      }
    }

  return (

    <div className="sticky top-20 h-[calc(100vh-90px)] overflow-y-auto">

      <div className="bg-white rounded-2xl border p-4">

        {/* MAIN MENU */}

        <div className="space-y-1">

          <SidebarItem
            icon={<Home size={20} />}
            text="Home"
            href="/"
          />

          <SidebarItem
            icon={<Flame size={20} />}
            text="Popular"
            href="/popular"
          />

          <SidebarItem
            icon={<Compass size={20} />}
            text="Explore"
            href="/explore"
          />

          <SidebarItem
            icon={<Newspaper size={20} />}
            text="News"
            href="/news"
          />

          <SidebarItem
            icon={<Trophy size={20} />}
            text="Sports"
            href="/sports"
          />

          <SidebarItem
            icon={<Gamepad2 size={20} />}
            text="Gaming"
            href="/gaming"
          />

        </div>

        {/* DIVIDER */}

        <div className="border-t my-4"></div>

        {/* CUSTOM FEEDS */}

        <div>

          <h2 className="text-xs font-bold text-gray-500 mb-3 uppercase">

            Custom Feeds

          </h2>

          <button className="w-full bg-gray-100 hover:bg-gray-200 transition rounded-full py-2 text-sm font-semibold flex items-center justify-center gap-2">

            <Plus size={16} />

            Create Custom Feed

          </button>

        </div>

        {/* DIVIDER */}

        <div className="border-t my-4"></div>

        {/* COMMUNITIES */}

        <div>

          <h2 className="text-xs font-bold text-gray-500 mb-3 uppercase">

            Communities

          </h2>

          <SidebarItem
            icon={<Users size={20} />}
            text="Manage Communities"
            href="/communities"
          />

          {/* DYNAMIC COMMUNITIES */}

          <div className="mt-3 space-y-1">

            {communities.map((community) => (

              <Link
                key={community.id}
                href={`/community/${community.id}`}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition text-sm font-medium"
              >

                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">

                  {community.name.charAt(0)}

                </div>

                <span>

                  c/{community.name}

                </span>

              </Link>

            ))}

          </div>

        </div>

        {/* DIVIDER */}

        <div className="border-t my-4"></div>

        {/* RESOURCES */}

        <div>

          <h2 className="text-xs font-bold text-gray-500 mb-3 uppercase">

            Resources

          </h2>

          <div className="space-y-1">

            <SidebarItem
              icon={<Info size={18} />}
              text="About Reddit"
              href="/about"
            />

            <SidebarItem
              icon={<Megaphone size={18} />}
              text="Advertise"
              href="/advertise"
            />

            <SidebarItem
              icon={<Briefcase size={18} />}
              text="Careers"
              href="/careers"
            />

            <SidebarItem
              icon={<HelpCircle size={18} />}
              text="Help"
              href="/help"
            />

            <SidebarItem
              icon={<FileText size={18} />}
              text="Blog"
              href="/blog"
            />

          </div>

        </div>

      </div>

    </div>
  )
}

/* SIDEBAR ITEM */

function SidebarItem({
  icon,
  text,
  href
}) {

  return (

    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition text-sm font-medium"
    >

      {icon}

      <span>{text}</span>

    </Link>

  )
}
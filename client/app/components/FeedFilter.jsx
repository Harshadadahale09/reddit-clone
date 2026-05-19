'use client'

import {
  Flame,
  Sparkles,
  Clock3,
  TrendingUp,
  Rocket
} from 'lucide-react'

export default function FeedFilter({
  sort,
  setSort
}) {

  const filters = [

    {
      label: 'Best',
      value: 'best',
      icon: <Sparkles size={16} />
    },

    {
      label: 'Hot',
      value: 'popular',
      icon: <Flame size={16} />
    },

    {
      label: 'New',
      value: 'latest',
      icon: <Clock3 size={16} />
    },

    {
      label: 'Top',
      value: 'top',
      icon: <TrendingUp size={16} />
    },

    {
      label: 'Rising',
      value: 'rising',
      icon: <Rocket size={16} />
    }

  ]

  return (

    <div className="bg-white border rounded-2xl p-2 flex gap-2 overflow-x-auto mb-5">

      {filters.map((filter) => (

        <button
          key={filter.value}
          onClick={() =>
            setSort(filter.value)
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
            sort === filter.value
              ? 'bg-orange-500 text-white'
              : 'hover:bg-gray-100'
          }`}
        >

          {filter.icon}

          {filter.label}

        </button>

      ))}

    </div>

  )
}
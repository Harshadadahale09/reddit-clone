'use client'

export default function RightSidebar() {

  const communities = [

    {
      name: 'Technology',
      members: '120k'
    },

    {
      name: 'Gaming',
      members: '95k'
    },

    {
      name: 'Sports',
      members: '80k'
    },

    {
      name: 'Movies',
      members: '60k'
    }

  ]

  return (

    <div className="sticky top-20 space-y-5">

      {/* TRENDING COMMUNITIES */}

      <div className="bg-white rounded-2xl border p-5">

        <h2 className="font-bold text-lg mb-4">

          Trending Communities

        </h2>

        <div className="space-y-4">

          {communities.map(
            (community, index) => (

              <div
                key={index}
                className="flex items-center justify-between"
              >

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">

                    {community.name.charAt(0)}

                  </div>

                  <div>

                    <p className="font-semibold text-sm">

                      c/{community.name}

                    </p>

                    <p className="text-xs text-gray-500">

                      {community.members} members

                    </p>

                  </div>

                </div>

                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1 rounded-full">

                  Join

                </button>

              </div>

            )
          )}

        </div>

      </div>

      {/* COMMUNITY RULES */}

      <div className="bg-white rounded-2xl border p-5">

        <h2 className="font-bold text-lg mb-4">

          Community Rules

        </h2>

        <ul className="space-y-3 text-sm">

          <li>
            ✅ Be respectful
          </li>

          <li>
            ✅ No spam
          </li>

          <li>
            ✅ Follow rules
          </li>

          <li>
            ✅ Healthy discussion
          </li>

        </ul>

      </div>

      {/* PREMIUM CARD */}

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
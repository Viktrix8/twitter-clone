import { SearchIcon } from '@heroicons/react/outline'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

const Widgets = () => {
  return (
    <div className="col-span-2 mt-2 hidden px-2 lg:inline">
      {/* Search */}
      <div className="mt-2 flex items-center gap-x-2 rounded-full bg-gray-100 p-3">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          placeholder="Search Twitter"
          className="flex-1 bg-transparent outline-none"
          type="text"
        />
      </div>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="viktrix_"
        options={{ height: 1000 }}
      />
    </div>
  )
}

export default Widgets

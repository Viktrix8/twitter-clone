import { useState } from 'react'
import { RefreshIcon } from '@heroicons/react/outline'
import toast from 'react-hot-toast'

import { Tweet } from '../typings'
import TweetBox from './TweetBox'
import TweetComponent from './Tweet'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  tweets: Tweet[]
}

const Feed = ({ tweets: tweetsProp }: Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)

  const handleRefreshTweets = async () => {
    const tweets = await fetchTweets()
    const refreshToast = toast.loading('Refreshing...')
    setTweets(tweets)
    toast.success('Refreshed!', {
      id: refreshToast,
    })
  }
  return (
    <div className="col-span-7 h-screen overflow-scroll border-x scrollbar-hide lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
          onClick={handleRefreshTweets}
        />
      </div>

      <div>
        <TweetBox setTweets={setTweets} />
      </div>

      {/* Feed */}
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}

export default Feed

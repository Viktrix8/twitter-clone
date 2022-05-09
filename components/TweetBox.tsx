import { useState, useRef, FormEvent, Dispatch, SetStateAction } from 'react'
import {
  SearchCircleIcon,
  PhotographIcon,
  LocationMarkerIcon,
  EmojiHappyIcon,
  CalendarIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({ setTweets }: Props) => {
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [imageUrl, setImageUrl] = useState('')
  const { data: session } = useSession()

  const addImageToTweet = (e: FormEvent) => {
    e.preventDefault()

    if (!imageUrl) return

    setImage(imageUrl)
    setImageUrl('')
    setImageUrlBoxIsOpen(false)
  }

  const postTweet = async () => {
    const tweetBody: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      image: image,
    }

    const result = await fetch('/api/addTweet', {
      method: 'POST',
      body: JSON.stringify(tweetBody),
    })

    const json = await result.json()

    const newTweets = await fetchTweets()
    setTweets(newTweets)

    toast('Tweet Posted', {
      icon: '🚀',
    })

    return json
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    postTweet()
    setImage('')
    setImageUrl('')
    setInput('')
  }

  return (
    <div className="flex gap-x-2 p-5">
      <div>
        <img
          src={session?.user?.image || 'https://links.papareact.com/gll'}
          alt=""
          height={56}
          width={56}
          className="rounded-full object-cover"
        />
      </div>

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            type="text"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            placeholder="What's happening?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex items-center">
            <div className="flex flex-1 gap-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>

            <button
              className="rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
              disabled={!input || !session}
              onClick={handleSubmit}
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter Image URL..."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}

          {image && (
            <img
              src={image}
              alt=""
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox

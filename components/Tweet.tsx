import { FormEvent, useEffect, useState } from 'react'
import TimeAgo from 'react-timeago'
import {
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
  ChatAlt2Icon,
} from '@heroicons/react/outline'

import { Tweet, Comment, CommentBody } from '../typings'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

interface Props {
  tweet: Tweet
}

const Tweet = ({ tweet }: Props) => {
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState<boolean>(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const { data: session } = useSession()

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }

  const addComment = async () => {
    const commentBody: CommentBody = {
      comment: comment,
      tweetId: tweet._id,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
    }

    await fetch('/api/addComment', {
      method: 'POST',
      body: JSON.stringify(commentBody),
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await addComment()
    toast('Comment added!', { icon: '🚀' })
    await refreshComments()
    setComment('')
    setIsCommentBoxVisible(false)
  }

  useEffect(() => {
    refreshComments()
  }, [])

  return (
    <div className="flex flex-col gap-x-3 border-y border-gray-100 p-5">
      <div className="flex gap-x-3">
        <img
          src={tweet.profileImg}
          alt="profile image"
          className="h-10 w-10 rounded-full object-cover"
        />

        <div>
          <div className="flex items-center gap-x-1">
            <p className="flex-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, '').toLowerCase()} ·
            </p>

            <TimeAgo
              date={tweet._createdAt}
              className="text-sm text-gray-500"
            />
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              alt=""
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div className="flex cursor-pointer items-center gap-x-3 text-gray-400">
          <ChatAlt2Icon
            className="h-5 w-5"
            onClick={() => setIsCommentBoxVisible(!isCommentBoxVisible)}
          />
          <p>{comments?.length}</p>
        </div>
        <div className="flex cursor-pointer items-center gap-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center gap-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center gap-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {/* Comment Box Logic */}
      {isCommentBoxVisible && (
        <form className="mt-3 flex gap-x-3" onSubmit={handleSubmit}>
          <input
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            type="text"
            placeholder="Write a Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="font-bold text-twitter disabled:text-gray-200"
            disabled={!comment || !session?.user}
          >
            Post
          </button>
        </form>
      )}
      {comments?.length > 0 && (
        <div className="border-top my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-gray-100 p-5 scrollbar-hide">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex gap-x-2">
              <hr className="absolute left-3 top-10 h-8 border-x border-twitter/30" />
              <img
                src={comment.profileImg}
                className="mt-2 h-7 w-7 rounded-full object-cover"
                alt=""
              />
              <div>
                <div className="flex items-center gap-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{tweet.username.replace(/\s+/g, '').toLowerCase()} ·
                  </p>
                  <TimeAgo
                    date={comment._createdAt}
                    className="text-sm text-gray-500"
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tweet

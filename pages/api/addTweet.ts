import type { NextApiRequest, NextApiResponse } from 'next'
import { TweetBody } from '../../typings'

type Data = {
  message: string
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const data: TweetBody = JSON.parse(req.body)

  const mutations = {
    mutations: [
      {
        create: {
          _type: 'tweet',
          text: data.text,
          username: data.username,
          profileImg: data.profileImg,
          image: data.image,
          blockTweet: false,
        },
      },
    ],
  }

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`

  const result = await fetch(apiEndpoint, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}`,
    },
    body: JSON.stringify(mutations),
    method: 'POST',
  })

  const json = await result.json()
  console.log(json)

  res.status(200).json({ message: 'Added!' })
}

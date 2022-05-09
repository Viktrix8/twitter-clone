import { createClient } from "next-sanity"

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: 'v1',
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
}

export const sanityClient = createClient(config)
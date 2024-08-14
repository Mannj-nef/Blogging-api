import { CATEGORY, POST_STATUS, REACTION_TYPE } from 'src/constants/enum'

export type PostDetailResponse = {
  id: string
  title: string
  slug: string
  category: CATEGORY
  imageThumbnail?: string
  content: string
  status: POST_STATUS
  createdAt: Date
  updatedAt: Date
  popularity: number
  commentTotal: number
  reaction: {
    total: number
    type: REACTION_TYPE | null
  }
  user: {
    id: string
    firstName: string
    lastName: string
    coverPhoto: string
    userName: string
    email: string
  }
}

export type PostType = {
  id: string
  title: string
  createdAt?: string
  user: {
    email: string
    id: string
    image: string
    name: string
  }
}[]


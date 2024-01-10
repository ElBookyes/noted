export type PostsType = {
  title: string
  id: string
  createdAt?: string
  user: {
    name: string
    image: string
  }
}
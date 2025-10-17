export interface PostOwner {
  username: string;
  email: string;
}

export interface Post {
  title: string;
  content: string;
  published: boolean;
  id: number;
  created_at: string;
  owner_id: number;
  owner: PostOwner;
  votes: number;
}
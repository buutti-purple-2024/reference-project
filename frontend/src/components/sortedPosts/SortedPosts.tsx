

import Posts from "../posts/Posts";
import PostType from "../../types/PostType";

interface PostWithUser extends PostType {
  user: {
    username: string;
    profileImage?: string;
  }
}

interface SortedPostsProps {
  posts: PostWithUser[];
}

const SortedPosts: React.FC<SortedPostsProps> = ({ posts }) => {
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return <Posts posts={sortedPosts} />;
}

export default SortedPosts;

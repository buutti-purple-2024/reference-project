import "./posts.scss";
import Post from "../post/Post";
import PostType from "../../types/PostType";
import { UsersProvider } from "../../contexts/UsersContext";
//import { useEffect, useState } from "react";
//import axios from "axios";

interface PostWithUser extends PostType {
  user: {
    username: string;
    profileImage?: string;
  }
}

interface PostsProps {
  posts: PostWithUser[];
  refreshPosts: () => void;
}

const Posts: React.FC<PostsProps> = ( {posts, refreshPosts} ) => {


    const baseurl = "http://localhost:3001" 

    //const [posts, setPosts] = useState<PostType[] | null>(null);

    /* useEffect(() => {
      getPosts();
    }, []);

    const getPosts = async () => {
      try {
          const posts = await axios.get(`${baseurl}/posts`);
          const sortedPosts = posts.data.sort((a: PostType, b: PostType) => //Sorts data so that the newest post is first
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          console.log(sortedPosts);
          setPosts(sortedPosts);
      } catch (error) {
          console.error("error fetching posts:", error);
      }
    }; */

    const getImageUrl = (image: string | undefined) => {
      if (!image) {
        return '';
      }
      const isExternalUrl = image.startsWith('http://') || image.startsWith('https://');
      return isExternalUrl ? image : `${baseurl}/${image}`;
    };
  

  const mapPosts = () => {
    return posts!.map(post => (
    
      <Post
        key={post.post_id}
        post={post}
        username={post.user.username || ''}
        profileImage={getImageUrl(post.user.profileImage)}
        upvotes={post.upvotes}
        downvotes={post.downvotes}
        post_id={post.post_id}
        refreshPosts={refreshPosts}
      />
    ));
  };

  return (
    <UsersProvider>
      <div className="posts">
      {posts && posts.length > 0 ? mapPosts() : <p>No posts available</p>}
      </div>
    </UsersProvider>
  );
};

export default Posts;

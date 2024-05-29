import "./posts.scss";
import Post from "../post/Post";
import PostType from "../../types/PostType";
import { useEffect, useState } from "react";
import axios from "axios";

interface PostWithUser extends PostType {
  user: {
    username: string;
    profileImage?: string;
  }
}


interface PostsProps {
  posts: PostWithUser[];
}

const Posts: React.FC<PostsProps> = ( ) => {


    const baseurl = "http://localhost:3001" 
    const [posts, setPosts] = useState<PostWithUser[] | null>(null);

    useEffect(() => {
      getPosts();
    }, []);

    const getPosts = async () => {
      try {
          const posts = await axios.get(`${baseurl}/posts`);
          const sortedPosts = posts.data.sort((a: PostWithUser, b: PostWithUser) => //Sorts data so that the newest post is first
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          console.log(sortedPosts);
          setPosts(sortedPosts);
      } catch (error) {
          console.error("error fetching posts:", error);
      }
    };

    const mapPosts = () => {
      return posts.map(post => (
        <Post 
            key={post.post_id} 
            post={post} // prop includes e.g. image, title & content
            username={post.user.username || ''}
            profileImage={post.user.profileImage || ''}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
        />
      ));
    };

    return (
      <div className="posts">
        {posts && posts.length > 0 ? mapPosts() : <p>No posts available</p>}
      </div>
    );
}


export default Posts;

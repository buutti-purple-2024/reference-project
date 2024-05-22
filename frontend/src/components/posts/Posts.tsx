import "./posts.scss";
import Post from "../post/Post";
import { useEffect, useState } from 'react';
import axios from "axios";
import PostType from "../../types/PostType";


const PostsAxios: React.FC = () => {

    const baseurl = "http://localhost:3001" 
    const [posts, setPosts] = useState<PostType[] | null>(null);

    useEffect(() => {
      getPosts()
    }, [])

    const getPosts = async () => {
      try {
        const users = await axios.get(`${baseurl}/posts`);
        console.log(users.data);
        setPosts(users.data);
      } catch (error) {
        console.error("error fetching posts:", error);
      }
    
    }

    const mapPosts = () => {
      return(
      posts?.map(post => {
      
        return <Post 
            key={post.post_id} 
            post={post} // prop includes e.g. image, title & content
            username={post.user.username || ''}
            profileImage={post.user.profileImage || ''}
            />;
      
      }))}

    return (
    <div className="posts">
      {console.log(posts)}
      {posts && mapPosts()}
    </div>

    )
}

export default PostsAxios;
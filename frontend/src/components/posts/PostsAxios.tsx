import "./posts.scss";
import Post from "../post/Post";
//import UsersContext from "../../contexts/UsersContext";
//import UsersPostsContext from "../../contexts/UsersPostsContext";
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
        console.error("error fertching posts:", error);
      }
    
    }

    const mapPosts = () => {
      return(
      posts?.map(post => {
        //const user = users.find(user => user.id === post.user_id);
        return <Post 
            key={post.post_id} 
            post={post} 
            username={post.user.username || ''} //näyttää usernamen
            profileImage={post.user.profileImage || ''}
            //upvotes={post.upvotes}
            //downvotes={post.downvotes}
            />;
      
      }))}

    return (
    <div className="posts">
      {console.log(posts)}
      <h1>Posts fetched from backend</h1>
      {posts && mapPosts()}
    </div>

    )
}

export default PostsAxios;
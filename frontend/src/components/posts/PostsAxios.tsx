import "./posts.scss";
import Post from "../post/Post";
import UsersContext from "../../contexts/UsersContext";
import UsersPostsContext from "../../contexts/UsersPostsContext";
import { useContext, useEffect, useState } from 'react';
import axios from "axios";


const PostsAxios: React.FC = () => {

    const baseurl = "http://localhost:3001" 
    const [posts, setPosts] = useState(null);

    useEffect(() => {
      getPosts()
    }, [])

    const getPosts = async () => {
      const users = await axios.get(`${baseurl}/posts`)
      console.log(users.data)
      setPosts(users.data)
    }

    const mapPosts = () => {
      return(
      posts.map(post => {
        //const user = users.find(user => user.id === post.user_id);
        return <Post 
            key={post.post_id} 
            post={post.content} 
            username={post.user.username || ''} 
            profileImage={post.user.profileImage || ''} 
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            />;
            
    })
      )
    }

    return (
    <div className="posts">
      {console.log(posts)}
      <h1>Posts fetched from backend</h1>
        {posts && mapPosts()}
    </div>

    )
}

export default PostsAxios;
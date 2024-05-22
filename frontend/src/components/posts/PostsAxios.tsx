import "./posts.scss";
import Post from "../post/Post";
import { useEffect, useState } from 'react';
import axios from "axios";
import PostType from "../../types/PostType";

interface PostWithUser extends PostType {
  user: {
    username: string;
    profileImage?: string;
  }
}

const PostsAxios: React.FC = () => {
    const baseurl = "http://localhost:3001"; 
    const [posts, setPosts] = useState<PostWithUser[] | null>();

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const posts = await axios.get(`${baseurl}/posts`);
            console.log("Posts:", posts.data);
            setPosts(posts.data);
        } catch (error) {
            console.error("error fetching posts:", error);
        }
    };

    const mapPosts = () => {
        if (!posts) return null;
        return posts.map(post => (
            <Post 
                key={post.post_id} 
                post={post} 
                username={post.user.username || ''} 
                profileImage={post.user.profileImage || ''}
                upvotes={post.upvotes}
                downvotes={post.downvotes}
            />
        ));
    };

    return (
        <div className="posts">
          
          <h1>Posts fetched from backend</h1>
            {mapPosts()}
          </div>
         
    );
};

export default PostsAxios;

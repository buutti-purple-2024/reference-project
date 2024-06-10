import "./home.scss";
import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import PostCreate from "../../components/postCreate/PostCreate";
import PostType from "../../types/PostType";
import axios from "axios";
import CreateTopic from "../../components/createTopic/CreateTopic";

interface PostWithUser extends PostType {
  user: {
    username: string;
    profileImage?: string;
  };
}

const Home = () => {
  const baseurl = "http://localhost:3001";
  const [posts, setPosts] = useState<PostWithUser[]>([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
        const posts = await axios.get(`${baseurl}/posts`);
        const sortedPosts = posts.data.sort((a: PostWithUser, b: PostWithUser) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        console.log(sortedPosts);
        setPosts(sortedPosts);
    } catch (error) {
        console.error("error fetching posts:", error);
    }
  };

  return (
    <div className="home">
      <PostCreate refreshPosts={getPosts} />
      <h2>Feed</h2>
      <Posts posts={posts} refreshPosts={getPosts} />
      <CreateTopic/>
    </div>
  );
};

export default Home;

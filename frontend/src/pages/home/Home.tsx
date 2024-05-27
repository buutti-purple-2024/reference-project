import "./home.scss";
import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import PostCreate from "../../components/postCreate/PostCreate";
import PostType from "../../types/PostType";
import UserType from "../../types/UserType";
import axios from "axios";

interface PostWithUser extends PostType {
  user: {
    username: string;
    profileImage?: string;
  };
}

const Home = () => {
  const baseurl = "http://localhost:3001";
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseurl}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseurl}/posts`);
        const postsData = response.data as PostType[];

        // Ensure users are already fetched
        if (users.length > 0) {
          const postsWithUser = postsData.map(post => {
            const user = users.find(u => u.id === post.user_id);
            if (!user) {
              throw new Error(`User with id ${post.user_id} not found`);
            }
            return {
              ...post,
              user: {
                username: user.username,
                profileImage: user.profileImage,
              },
            };
          });

          setPosts(postsWithUser);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [users]); // Fetch posts after users are available

  return (
    <div className="home">
      <PostCreate />
      <h2>Posts fetched from backend</h2>
      <Posts posts={posts} />
    </div>
  );
};

export default Home;

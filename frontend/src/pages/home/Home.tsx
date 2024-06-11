import "./home.scss";
import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import PostCreate from "../../components/postCreate/PostCreate";
import PostType from "../../types/PostType";
//import UserType from "../../types/UserType";
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
  //const [users, setUsers] = useState<UserType[]>([]);

 /*  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseurl}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); */

  /* useEffect(() => {
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
  }, [users]); */


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

  return (
    <div className="home">
      <PostCreate refreshPosts={getPosts}/>
      <h2>Feed</h2>
      <Posts posts={posts} refreshPosts={getPosts}/>
      <CreateTopic/>
    </div>
  );
};

export default Home;

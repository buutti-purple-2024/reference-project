// src/components/profileContent/ProfileContent.tsx
import { useEffect, useState } from "react";
import "./profileContent.scss";
import Posts from "../posts/Posts";
import ProfileBanner from "../profileBanner/profileBanner";
//import fakeUsers from "../../tempData/fakeUsers";
import UserType from "../../types/UserType";
import PostType from "../../types/PostType";
import axios from "axios";

interface ProfileContentProps {
  currentUser: UserType;
}

interface PostWithUser extends PostType {
  user: {
    username: string;
    profileImage?: string;
  }
}

const ProfileContent: React.FC<ProfileContentProps> = ({ currentUser }) => {
  const [myposts, setMyPosts] = useState<PostWithUser[]>([]);
  const baseurl = "http://localhost:3001";
  const [users, setUsers] = useState<UserType[]>([]);


    const getUsers = async () => {
        try {
            const response = await axios.get(`${baseurl}/users`);
            const usersData = response.data as UserType[];
            console.log("Users Data:", usersData);
            setUsers(usersData); // Assuming setUsers is the state updater function for the users array
        } catch (error) {
            console.error("error fetching users:", error);
        }
    };


  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(`${baseurl}/posts`);
        const posts = response.data as PostType[];
        const postsWithUser = posts.filter(post => post.user_id === currentUser.id).map(post => {
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
  
        setMyPosts(postsWithUser);
      } catch (error) {
        console.error("error fetching posts:", error);
      }
    };
    getUsers();
    getPosts();
  }, [users, currentUser.id]);


  return (
    <div className="profile">
      <ProfileBanner currentUser={currentUser} />
      {myposts.length > 0 
        ? <Posts posts={myposts} /> 
        : <p className="noPosts">This user hasn't posted anything yet</p>}
    </div>
  );
};

export default ProfileContent;

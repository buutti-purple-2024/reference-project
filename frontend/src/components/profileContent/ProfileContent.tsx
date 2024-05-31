

import { useEffect, useState } from "react";
import "./profileContent.scss";
import Posts from "../posts/Posts";
import ProfileBanner from "../profileBanner/profileBanner";
import UserType from "../../types/UserType";
import PostType from "../../types/PostType";
import axios from "axios";

interface ProfileContentProps {
  user: UserType;
}

interface PostWithUser extends PostType {
  user: {
    username: string;
    profileImage?: string;
  }
}

const ProfileContent: React.FC<ProfileContentProps> = ({ user }) => {
  const [myposts, setMyPosts] = useState<PostWithUser[]>([]);
  const baseurl = "http://localhost:3001";


  useEffect(() => {
  const getPosts = async () => {
    if (!user || !user.id) {
      console.error("User object is undefined or missing id:", user);
      return;
    }
    try {
      const response = await axios.get(`${baseurl}/posts`);
      const posts = response.data as PostWithUser[];
        const filteredPosts = posts.filter(post => post.user_id === user.id);

      setMyPosts(filteredPosts);
        } catch (error) {
        console.error("error fetching posts:", error);
      }
    };

  getPosts();
  }, [user]);

  return (
    <div className="profile">
      <ProfileBanner user={user} />
      {myposts.length > 0 
        ? <Posts posts={myposts} /> 
        : <p className="noPosts">This user hasn't posted anything yet</p>}
    </div>
  
  );
};

export default ProfileContent;

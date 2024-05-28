

import { useEffect, useState } from "react";
import "./profileContent.scss";
import Posts from "../posts/Posts";
import ProfileBanner from "../profileBanner/profileBanner";
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


  useEffect(() => {
  const getPosts = async () => {
    try {
      const response = await axios.get(`${baseurl}/posts`);
      const posts = response.data as PostWithUser[];
        const filteredPosts = posts.filter(post => post.user_id === currentUser.id);

      setMyPosts(filteredPosts);
        } catch (error) {
        console.error("error fetching posts:", error);
      }
    };

  getPosts();
  }, [currentUser.id]);

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

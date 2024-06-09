

import { useEffect, useState } from "react";
import "./profileContent.scss";
import "../post/post.scss"
//import Posts from "../posts/Posts";
import SortedPosts from "../sortedPosts/SortedPosts";
import ProfileBanner from "./profileBanner/profileBanner";
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
  console.log("passed user:", user)


  useEffect(() => {
  const getPosts = async () => {
    if (!user || !user.id) {
      console.error("User object is undefined or missing id:", user);
      return;
    }
    try {
      const response = await axios.get(`${baseurl}/posts`);
      const posts = response.data as PostWithUser[];

      console.log("Fetched posts:", posts);
      console.log("Current user id:", user.id);


      const filteredPosts = posts.filter(post => {
        //console.log("Comparing post.user_id:", post.user_id, "with user.id:", user.id);
        return post.user_id === user.id;
      });


      setMyPosts(filteredPosts);
      console.log("filtered P:", filteredPosts)
        } catch (error) {
        console.error("error fetching posts:", error);
      }
    };

  getPosts();
  }, [user]);

  return (
    <div>
    <div className="profile">
      <ProfileBanner user={user} />
    </div>
      <div className="post">
        {myposts.length > 0 
          ? <SortedPosts posts={myposts} /> 
          : <p className="noPosts">This user hasn't posted anything yet</p>}
      </div>
    
  </div>
  );

};

export default ProfileContent;

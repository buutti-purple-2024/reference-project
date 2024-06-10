import "./userProfile.scss";
import UserType from "../../types/UserType";
//import PostType from "../../types/PostType";
//import { useState, useEffect } from "react";
//import axios from "axios";
import ProfileContent from "./ProfileContent";

interface ProfileContentProps {
    user: UserType | null;
  }

const ProfileComponent: React.FC<ProfileContentProps> = ({user}) => {
    /* console.log("User", user) */

    if (!user) return null;

    return (
        <div className="profile">
            <ProfileContent user={user}/>
        </div>
    );
};

export default ProfileComponent;
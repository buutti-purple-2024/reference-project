import UserType from "../../types/UserType";
import "./profileBanner.scss";
import DefaultProfileImage from './Default_avatar_profile.jpg';
import DefaultBannerImage from './banner-background.jpg';


interface ProfileBannerProps {
    user: UserType;
  }

const ProfileBanner: React.FC<ProfileBannerProps> = ({user}) => {
    if (!user) {
        console.error("ProfileBanner received undefined user");
        return null;
      }
    return (
        <div className="banner">
          <img 
            src={user.profileBanner || DefaultBannerImage} 
            alt="Banner" 
            className="banner-image" 
            onError={(e) => { e.currentTarget.src = DefaultBannerImage; }}
            />
          <img
                src={user.profileImage || DefaultProfileImage}
                alt="Profile"
                className="profile-image"
                onError={(e) => { e.currentTarget.src = DefaultProfileImage; }}
                />
      <div className="nameAndProfile">
        <div className="username">{user.username}</div>
        <div className="profiletext">{user.profileText}</div>
      </div>
    </div>
  );
};


export default ProfileBanner;
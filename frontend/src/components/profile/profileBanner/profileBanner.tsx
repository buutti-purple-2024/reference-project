import UserType from "../../../types/UserType";
import "./profileBanner.scss";

interface ProfileBannerProps {
    user: UserType;
  }

const ProfileBanner: React.FC<ProfileBannerProps> = ({user}) => {
    /* console.log("ProfileBanner user:", user); */
    if (!user) {
        console.error("ProfileBanner received undefined user");
        return null;
      }
    return (
        <div className="banner">
            {user.profileBanner && (
        <img src={user.profileBanner} alt="Banner" className="banner-image" />
      )}
      {user.profileImage && (
        <img src={user.profileImage} alt="Profile" className="profile-image" />
      )}
      <div className="nameAndProfile">
        <div className="username">{user.username}</div>
        <div className="profiletext">{user.profileText}</div>
      </div>
    </div>
  );
};


export default ProfileBanner;
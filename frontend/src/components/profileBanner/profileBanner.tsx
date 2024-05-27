import UserType from "../../types/UserType";
import "./profileBanner.scss";

interface BannerProps {
    currentUser: UserType;
  }

const ProfileBanner: React.FC<BannerProps> = ({currentUser}/* { username, profileBanner, profileImage, profileText } */) => {
    return (
        <div className="banner">
            <img src={currentUser.profileBanner} alt="Banner" className="banner-image" />
            <img src={currentUser.profileImage} alt="ProfileImage" className="profile-image" />
            <div className="nameAndProfile">
                <div className="username">My Profile: {currentUser.username}</div>
                <div className="profiletext">{currentUser.profileText}</div>
            </div>
            
        </div>
    );
};

export default ProfileBanner;
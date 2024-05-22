import "./profileBanner.scss";

interface BannerProps {
    
    username: string;
    profileBanner: string;
    profileImage: string;
    profileText: string;
  }

const ProfileBanner: React.FC<BannerProps> = ({ username, profileBanner, profileImage, profileText }) => {
    return (
        <div className="banner">
            <img src={profileBanner} alt="Banner" className="banner-image" />
            <img src={profileImage} alt="ProfileImage" className="profile-image" />
            <div className="nameAndProfile">
                <div className="username">My Profile: {username}</div>
                <div className="profiletext">{profileText}</div>
            </div>
            
        </div>
    );
};

export default ProfileBanner;
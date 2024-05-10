import "./profileBanner.scss";

interface BannerProps {
    
    username: string;
    bannerImage: string;
    profileImage: string;
    profileText: string;
  }

const ProfileBanner: React.FC<BannerProps> = ({ username, bannerImage, profileImage, profileText }) => {
    return (
        <div className="banner">
            <img src={bannerImage} alt="Banner" className="banner-image" />
            <img src={profileImage} alt="ProfileImage" className="profile-image" />
            <div className="username">My Profile: {username}</div>
            <div className="profiletext">{profileText}</div>
        </div>
    );
};

export default ProfileBanner;
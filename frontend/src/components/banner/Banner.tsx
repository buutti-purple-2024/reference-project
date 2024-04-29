import "./banner.scss";

interface BannerProps {
    
    username: string;
    bannerImage: string;
    profileImage: string;
  }

const Banner: React.FC<BannerProps> = ({ username, bannerImage, profileImage }) => {
    return (
        <div className="banner">
            <img src={bannerImage} alt="Banner" className="banner-image" />
            <img src={profileImage} alt="ProfileImage" className="profile-image" />
            <div className="username">My Profile: {username}</div>
        </div>
    );
};

export default Banner;
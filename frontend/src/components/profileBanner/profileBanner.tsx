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
<<<<<<< HEAD
            {console.log(username)}
            <img src={bannerImage} alt="Banner" className="banner-image" />
=======
            <img src={profileBanner} alt="Banner" className="banner-image" />
>>>>>>> 0077a152c56d63cbcba5e0c070d1dd3bbcf74222
            <img src={profileImage} alt="ProfileImage" className="profile-image" />
            <div className="username">My Profile: {username}</div>
            <div className="profiletext">{profileText}</div>
        </div>
    );
};

export default ProfileBanner;
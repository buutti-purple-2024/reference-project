import "./chatBanner.scss"


interface ChatBannerProps {
    
    username: string;
    profileImage?: string;
  }

const ChatBanner: React.FC<ChatBannerProps> = ({ username, profileImage }) => {
    return (
        <div className="chatbanner">
            <img src={profileImage} alt="ProfileImage" className="profile-image" />
            <div className="username">{username}</div>
        </div>
    );
};

export default ChatBanner;
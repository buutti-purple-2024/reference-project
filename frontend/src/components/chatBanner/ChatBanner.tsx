import "./chatBanner.scss"


interface ChatBannerProps {
    
    username: string;
    profileImage?: string;
  }

const ChatBanner: React.FC<ChatBannerProps> = ({ username, profileImage }) => {
    console.log("ChatBanner props:", { username, profileImage });

    return (
        <div className="chatbanner">
            <img src={profileImage} alt="ProfileImage" className="profile-image" />
            <div className="username">My chat with {username}</div>
            <hr/>
        </div>
    );
};

export default ChatBanner;
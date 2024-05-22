import "./chatComp.scss"
import MessageType from "../../types/MessageType";
import UserType from "../../types/UserType";
import ChatBanner from "../chat banner/ChatBanner";

interface ChatProps {
    currentUser: UserType; 
    users: UserType[];
    messages: MessageType[];
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}

const ChatComp: React.FC<ChatProps> = ({ currentUser }) => {
    const { username, profileImage } = currentUser;

    return (
        <div className="chat">
            <ChatBanner username={username} profileImage={profileImage}/>
        </div>
    );
};

export default ChatComp;
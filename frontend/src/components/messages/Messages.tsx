import "./messages.scss";
import WriteMessage from "./WriteMessage";
import MessageType from "../../types/MessageType";
import UserType from "../../types/UserType";

interface MessagesProps {
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    messages: MessageType[];
    users: UserType[];
}

const Messages: React.FC<MessagesProps> = ({ users, messages, setMessages }) => {

    return (
        <div className="chat-messages">
            {messages.map((message, index) => {
                const user = users.find(user => user.id === message.user_id);

                if (!user) {
                    console.log(`No user found for message with user_id: ${message.user_id}`);
                    return null; // Skip rendering if no user is found
                }

                return (
                    <div key={index} className="message">
                        <img src={user.profileImage} alt={user.username} />
                        <div className="content">
                            <div className="user-details">
                                <span className="username">{user.username}</span>
                                <span className="date">{new Date(message.created_at).toLocaleString()}</span>
                            </div>
                            <div className="message-content">{message.content}</div>
                        </div>
                    </div>
                );
            })}
            <WriteMessage setMessages={setMessages} />
        </div>
    );
};

export default Messages;

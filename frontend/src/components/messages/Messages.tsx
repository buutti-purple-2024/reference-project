import "./messages.scss";
import WriteMessage from "./WriteMessage";
import MessageType from "../../types/MessageType";
//import fakeMessages from "../../tempData/fakeMessages";
import UserType from "../../types/UserType";
//import fakeUsers from "../../tempData/fakeUsers";

interface MessagesProps {
    messages: MessageType[];
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    users: UserType[];
}

const Messages: React.FC<MessagesProps> = ({ messages, setMessages, users }) => {

    return (
        <div className="chat-messages">
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.user_id}`}>
                    {users.map((user) => (
                        user.id === message.user_id && (
                            <div className="data" key={user.id}>
                                <img src={user.profileImage} alt="" />
                                <span>{user.username}</span>
                            </div>
                        )
                    ))}
                    <div className="content">{message.content}</div>
                </div>
            ))}
            <WriteMessage setMessages={setMessages} />
        </div>
    );
};

export default Messages;

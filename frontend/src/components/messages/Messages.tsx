import "./messages.scss";
import WriteMessage from "./WriteMessage";
import MessageType from "../../types/MessageType";
//import UserType from "../../types/UserType";
import MessageContext from "../../contexts/MessagesContext";
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";

interface MessagesProps {
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}

const Messages: React.FC<MessagesProps> = ({ setMessages }) => {

    const messages = useContext(MessageContext);
    const users = useContext(UsersContext);

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

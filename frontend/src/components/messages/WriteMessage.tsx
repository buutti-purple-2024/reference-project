import "./messages.scss"
import { useState } from "react";
import MessageType from "../../types/MessageType"; // Assuming MessageType is defined correctly
import UserType from "../../types/UserType";

interface WriteMessageProps {
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    currentUser: UserType;
    chatId: number | null;
    messages: MessageType[];
}

const WriteMessage: React.FC<WriteMessageProps> = ({ currentUser, setMessages, chatId, messages }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '' && chatId !== null) {
            const highestMessageId = messages.length > 0 ? Math.max(...messages.map(msg => msg.message_id)) : 0;
            const newMessageId = highestMessageId + 1;
            const currentTime = new Date().toISOString();

            const newMessageData: MessageType = {
                message_id: newMessageId,
                chat_id: chatId,
                content: newMessage,
                sender_id: currentUser.id,
                created_at: currentTime
            };

            // Add the new message to the existing messages
            setMessages(prevMessages => [...prevMessages, newMessageData]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-input">
        <div className="message outgoing">
      
          <img src={currentUser.profileImage} alt={currentUser.username} />                       
         
        <div className="content">
        <div className="user-details">
            <span className="u-username">{currentUser.username}</span>
            <span className="date">{new Date().toLocaleString()}</span>
        </div>
        <div className="message-content">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="message-input"
          />
          </div>
          <button onClick={handleSendMessage} className="message-send-button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default WriteMessage;
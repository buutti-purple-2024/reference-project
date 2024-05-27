import "./messages.scss"
import { useState } from "react";
import MessageType from "../../types/MessageType"; // Assuming MessageType is defined correctly

interface WriteMessageProps {
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}

const WriteMessage: React.FC<WriteMessageProps> = ({ setMessages }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const randomMessageId = Math.random();
            const randomUserId = Math.random();
            const randomChatId = Math.random();
            const currentTime = new Date().toISOString();

            const newMessageData: MessageType = {
                message_id: randomMessageId,
                chat_id: randomChatId,
                content: newMessage,
                sender_id: randomUserId,
                receiver_id: randomUserId,
                created_at: currentTime
            };

            // Add the new message to the existing messages
            setMessages(prevMessages => [...prevMessages, newMessageData]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-input">
            <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default WriteMessage;

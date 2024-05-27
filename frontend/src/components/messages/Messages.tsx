import { useState, useEffect } from "react";
import axios from "axios";
import MessageType from "../../types/MessageType";
import UserType from "../../types/UserType";
import ChatType from "../../types/ChatType";
import WriteMessage from "./WriteMessage";

interface MessagesProps {
    users: UserType[];
    currentUser: UserType;
    chats: ChatType[];
    selectedUser: UserType | null;
    selectedChat: ChatType;
}

const Messages: React.FC<MessagesProps> = ({ currentUser, users, chats, selectedUser }) => {
    const baseurl = "http://localhost:3001";
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [chatId, setChatId] = useState<number | null>(null);

    // useEffect to set the chatId based on the selectedUser
    useEffect(() => {
        if (selectedUser) {
            // Find the chat corresponding to the selectedUser
            const chat = chats.find(chat => 
                (chat.user1_id === currentUser.id && chat.user2_id === selectedUser.id) ||
                (chat.user1_id === selectedUser.id && chat.user2_id === currentUser.id)
            );
            if (chat) {
                setChatId(chat.chat_id);
            }
        }
    }, [selectedUser, currentUser, chats]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (chatId) {
                    const response = await axios.get(`${baseurl}/messages/${chatId}`);
                    console.log("Fetched messages:", response.data);
                    setMessages(response.data);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [chatId]);

    return (
        <div className="chat-messages">
            {messages.map((message, index) => {
                const sender = users.find(user => user.id === message.sender_id || user.id === currentUser.id);

                if (!sender || !currentUser) {
                    console.log(`No user found for message with user_id: ${message.sender_id}`);
                    // Continue rendering without sender data
                    return (
                        <div key={index} className="message">
                            <div className="content">
                                <div className="user-details">
                                    <span className="u-username">Unknown User</span>
                                    <span className="date">{new Date(message.created_at).toLocaleString()}</span>
                                </div>
                                <div className="message-content">{message.content}</div>
                            </div>
                        </div>
                    );
                }

                const previousMessage = messages[index - 1];
                const showProfileImageAndDate = !previousMessage || previousMessage.sender_id !== message.sender_id;

                return (
                    <div key={index} className="message">
                        {showProfileImageAndDate 
                            ? <img src={sender.profileImage} alt={sender.username} />
                            : <div className="image-placeholder" />}                        
                        <div className="content">
                            <div className="user-details">
                                {showProfileImageAndDate && <span className="u-username">{sender.username}</span>}
                                {showProfileImageAndDate && <span className="date">{new Date(message.created_at).toLocaleString()}</span>}
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

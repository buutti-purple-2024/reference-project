import "./chatCreate.scss";
import axios from 'axios';
import ChatType from "../../types/ChatType";
import { useState } from 'react';
import ChatUserSearch from "../chatUserSearch/ChatUserSearch";
import UserType from "../../types/UserType";

interface ChatCreateProps {
    currentUser: UserType;
    onChatCreated: (newChat: ChatType) => void;
}

interface CreateChatResponse {
    chat_id: number;
    user1_id: number;
    user2_id: number;
    created_at: string;
}

const ChatCreate: React.FC<ChatCreateProps> = ({ currentUser, onChatCreated }) => {
    const [receiver, setReceiver] = useState<UserType | null>(null);
    const [error, setError] = useState<string | null>(null);
    //console.log("CurrentUSER:", currentUser)

    const createChat = async (user1_id: number, user2_id: number): Promise<CreateChatResponse> => {
        try {
            const created_at = new Date().toISOString();
            const chat_id = Math.floor(Math.random() * 100000); 
            const chatData = { user1_id, user2_id, created_at, chat_id };
            console.log('Sending request to create chat:', chatData);
            const response = await axios.post<CreateChatResponse>('http://localhost:3001/chats', chatData, {
                headers: { 'Content-Type': 'application/json' }
            });

            
            return response.data;
        } catch (error: any) {
            console.error('Error creating chat:', error);
            throw error.response ? error.response.data : new Error('Network error');
        }
    };

    const handleCreateChat = async () => {
        if (!receiver) {
            setError('No receiver selected');
            return;
        }
        try {
            const newChat = await createChat(currentUser.id, receiver.id);
            setError(null);
            onChatCreated(newChat); 
        } catch (err: any) {
            console.error('Failed to create chat:', err);
            setError(err.error || 'Failed to create chat');
        }
    };

    return (
        <div className="chat-create">
            <form onSubmit={(e) => { e.preventDefault(); handleCreateChat(); }}>
                <label>
                    Search user to chat with:
                    <ChatUserSearch onUserForChatSelect={setReceiver} />
                </label>
                <button type="submit" disabled={!receiver}>Create Chat</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ChatCreate;

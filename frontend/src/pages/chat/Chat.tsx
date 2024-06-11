
import "./chat.scss";
import ChatComponent from "../../components/chatComponent/ChatComponent";
import UserType from "../../types/UserType";
import ChatType from "../../types/ChatType";
import axios from "axios";
import { useEffect, useState } from "react";
import ChatCreate from "../../components/chatCreate/ChatCreate";
import { useUserContext } from "../../contexts/UserContext";

interface ChatProps {
    selectedUser: UserType | null;
}

const Chat: React.FC<ChatProps> = ({ selectedUser }) => {
    const { currentUser } = useUserContext(); 
    const [chats, setChats] = useState<ChatType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const baseurl = "http://localhost:3001";

    useEffect(() => {
        const fetchChats = async () => {
            if (currentUser && selectedUser) {
                setError(null);
                try {
                    const response = await axios.get(`${baseurl}/chats`, {
                        params: { user1: currentUser.id, user2: selectedUser.id },
                    });
                    setChats(response.data);
                } catch (error) {
                    setError("Error fetching chats");
                }
            }
        };

        fetchChats();
    }, [currentUser, selectedUser]);

    if (!currentUser) {
        return <div>You need to log in to see chats.</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleChatCreated = (newChat: ChatType) => {
        setChats(prevChats => [...prevChats, newChat]);
    };

    return (
        <div className="chat">
            <ChatCreate onChatCreated={handleChatCreated}/>
            {currentUser && selectedUser && (
                <ChatComponent
                    selectedUser={selectedUser}
                    chats={chats}
                />
            )}
        </div>
    );
};

export default Chat;









/* import "./chat.scss";
import ChatComponent from "../../components/chatComponent/ChatComponent";
import UserType from "../../types/UserType";
import ChatType from "../../types/ChatType";
import axios from "axios";
import { useEffect, useState } from "react";
import ChatCreate from "../../components/chatCreate/ChatCreate";
import { useUserContext } from "../../contexts/UserContext";

interface ChatProps {
    selectedUser: UserType | null;
    
}

const Chat: React.FC<ChatProps> = ({ selectedUser }) => {
    const { currentUser } = useUserContext(); 
    const [chats, setChats] = useState<ChatType[]>([]);
    const [error, setError] = useState<string | null>(null);
    console.log("CURRRRR USERRRRRR:", currentUser)
    const baseurl = "http://localhost:3001";

    useEffect(() => {
        const fetchChats = async () => {
            if (currentUser && selectedUser) {
                setError(null);
                try {
                    const response = await axios.get(`${baseurl}/chats`, {
                        params: { user1: currentUser.id, user2: selectedUser.id },
                    });
                    setChats(response.data);
                } catch (error) {
                    setError("Error fetching chats");
                }
            }
        };

        fetchChats();
    }, [currentUser, selectedUser]);

    if (!currentUser) {
        return <div>You need to log in to see chats.</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleChatCreated = (newChat: ChatType) => {
        setChats(prevChats => [...prevChats, newChat]);
    };

    return (
        <div className="chat">
            <ChatCreate onChatCreated={handleChatCreated}/>
            {currentUser && selectedUser && (
                <ChatComponent
                    selectedUser={selectedUser}
                    chats={chats}
                />
            )}
        </div>
    );
};

export default Chat;
 */


import "./chat.scss";
import ChatComponent from "../../components/chatComponent/ChatComponent";
import UserType from "../../types/UserType";
import ChatType from "../../types/ChatType";
import axios from "axios";
import { useEffect, useState } from "react";

interface ChatProps {
    currentUser: UserType;
    selectedUser: UserType | null;
    users: UserType[];
    chats: ChatType[];
}

const Chat: React.FC<ChatProps> = ({ currentUser, selectedUser }) => {
    const [chats, setChats] = useState<ChatType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const baseurl = "http://localhost:3001";

    useEffect(() => {
        const fetchChats = async () => {
            if (currentUser && selectedUser) {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(`${baseurl}/chats`, {
                        params: { user1: currentUser.id, user2: selectedUser.id },
                    });
                    setChats(response.data);
                } catch (error) {
                    setError("Error fetching chats");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchChats();
    }, [currentUser, selectedUser]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="chat">
            {currentUser && selectedUser && (
                <ChatComponent
                    currentUser={currentUser}
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
import fakeChats from "../../tempData/fakeChats";


interface ChatProps {
	currentUser: UserType;
	selectedUser: UserType | null;
	users: UserType[];
	chats: ChatType[];
}

const Chat: React.FC<ChatProps> = ({ currentUser, selectedUser }) => {


	return (
		<div className="chat"> 
            {currentUser && (
			<ChatComponent 
				currentUser={currentUser} 
				selectedUser={selectedUser} 
				chats={fakeChats}
			/>
            )}
		</div>
	);
};

export default Chat; */


import "./chatLeftBar.scss";
import { mdiForumOutline } from '@mdi/js';
import Icon from '@mdi/react';
import UserType from "../../types/UserType";
import ChatType from "../../types/ChatType";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";
import { useAuthContext } from "../../contexts/AuthContext";

interface ChatLeftBarProps {
    onUserSelect: (chat: UserType) => void;
}

const ChatLeftBar: React.FC<ChatLeftBarProps> = ({ onUserSelect }) => {
    const { currentUser } = useUserContext();
    const { auth } = useAuthContext();
    const baseurl = "http://localhost:3001";
    const [users, setUsers] = useState<UserType[]>([]);
    const [chats, setChats] = useState<ChatType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${baseurl}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        const fetchChats = async () => {
            try {
                const response = await axios.get(`${baseurl}/chats`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`  // Use auth.token for authorization
                    }
                });
                setChats(response.data);
            } catch (error) {
                setError("Error fetching chats");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
        fetchChats();
    }, [currentUser?.id, auth.token]);

    const filteredChats = chats.filter(chat => chat.user1_id === currentUser?.id || chat.user2_id === currentUser?.id);
    const chatUsers = users.filter(user => filteredChats.some(chat => chat.user1_id === user.id || chat.user2_id === user.id));

    return (
        <div className="chatLeftBar">
            <Icon path={mdiForumOutline} size={1} color="black" />
            <span>Direct messages</span>
            <hr />
            <ul>
                {chatUsers.filter(user => user.id !== currentUser?.id).map(user => (
                    <li key={user.id} className="chat-user" onClick={() => onUserSelect(user)}>
                        <Link to={`/chat/${user.id}`} className="user-link">
                            <div className="user-info">
                                <img src={user.profileImage} alt={user.username} width={40} height={40} />
                                <span>{user.username}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatLeftBar;





/* import "./chatLeftBar.scss";
import { mdiForumOutline } from '@mdi/js';
import Icon from '@mdi/react';
import UserType from "../../types/UserType";
import ChatType from "../../types/ChatType";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";


interface ChatLeftBarProps {
    onUserSelect: (chat: UserType) => void;
}

const ChatLeftBar: React.FC<ChatLeftBarProps> = ({  onUserSelect }) => {
    const { currentUser } = useUserContext();
    const baseurl = "http://localhost:3001";
    const [users, setUsers] = useState<UserType[]>([]);
    const [chats, setChats] = useState<ChatType[]>([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${baseurl}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        const fetchChats = async () => {
            try {
                const response = await axios.get(`${baseurl}/chats`);
                setChats(response.data);
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };

        fetchUsers();
        fetchChats();
    }, [currentUser?.id]);

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    const filteredChats = chats.filter(chat => chat.user1_id === currentUser.id || chat.user2_id === currentUser.id)
    const chatUsers = users.filter(user => filteredChats.some(chat => chat.user1_id === user.id || chat.user2_id === user.id));

    return (
        <div className="chatLeftBar">
            <Icon path={mdiForumOutline} size={1} color="black" />
            <span>Direct messages</span>
            <hr />
            <ul>
                {chatUsers.filter(user => user.id !== currentUser?.id).map(user => (
                    <li key={user.id} className="chat-user" onClick={() => onUserSelect(user)}>
                        <Link to={`/chat/${user.id}`} className="user-link">
                            <div className="user-info">
                                <img src={user.profileImage} alt={user.username} width={40} height={40} />
                                <span>{user.username}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatLeftBar;
 */
import "./chatLeftBar.scss";
import { mdiForumOutline } from '@mdi/js';
import Icon from '@mdi/react';
import UserType from "../../types/UserType";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


interface ChatLeftBarProps {
    currentUser: UserType;
    onUserSelect: (chat: UserType) => void;
}

const ChatLeftBar: React.FC<ChatLeftBarProps> = ({ currentUser, onUserSelect }) => {
    const baseurl = "http://localhost:3001";
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${baseurl}/users`);
                /* console.log("Fetched users:", response.data); */
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="chatLeftBar">
            <Icon path={mdiForumOutline} size={1} color="black" />
            <span>Direct messages</span>
            <hr />
            <ul>
                {users.filter(user => user.id !== currentUser.id).map(user => (
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

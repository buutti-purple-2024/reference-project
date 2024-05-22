import "./chatLeftBar.scss";
import { mdiForumOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Link } from "react-router-dom";
import UserType from "../../types/UserType";

interface ChatLeftBarProps {
    users: UserType[];
    currentUser: UserType;
}

const ChatLeftBar: React.FC<ChatLeftBarProps> = ({ users, currentUser }) => {
    return (
        <div className="chatLeftBar">
            <Icon path={mdiForumOutline} size={1} color="black"/>
            <span>Direct messages</span>
            <hr/>
            <ul>
                {users.filter(user => user.id !== currentUser.id).map(user => (
                    <div key={user.id} className="chat-user">
                        <Link to={`/chat/${user.id}`}>
                            <img src={user.profileImage} alt={user.username} width={40} height={40} />
                            <span>{user.username}</span>
                        </Link>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default ChatLeftBar;


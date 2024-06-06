
import "./navBar.scss";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiCircle } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';
import { mdiForumOutline } from '@mdi/js';
//import { mdiBellBadgeOutline } from '@mdi/js';
import UserType from "../../types/UserType";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserProfile from "../../pages/userProfile/UserProfile";
import { userContext } from "../../App";

interface NavBarProps {
    currentUser: UserType;
    onUserSelect: (user: UserType) => void;
}


const NavBar: React.FC<NavBarProps> = ({ currentUser, onUserSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<UserType[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    //const navigate = useNavigate();
    const {contextUsername, setContextUsername, contextRole, setContextRole } = useContext(userContext)
    const baseurl = "http://localhost:3001";

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${baseurl}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLogout = () => {
        setContextRole(null)
        setContextUsername(null)
        document.cookie = `username=${null}; max-age=0`
        document.cookie = `role=${null}; max-age=0`
        document.cookie = `accesstoken=${null}; max-age=0`
        document.cookie = `refreshtoken=${null}; max-age=0`

    }

    /* const handleUserClick = (user: UserType) => {
        console.log("selected U:", user)
        setSelectedUser(user);
        navigate(`/profile/${user.id}`);
    }; */

    return (
        <div className="navBar">
            <div className="left">
                <DropdownMenu/>
                <Icon path={mdiCircle} size={1} color="purple" />
                <Link to="/" style={{textDecoration: "none"}}>
                    <span>Purple</span>
                </Link>
                <div className="search">
                    {<Icon path={mdiMagnify} size={1} color="white"/>}
                    <input type="text" 
                           placeholder="search..." 
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                       />
                       {searchQuery && (
                        <ul className="search-results">
                            {filteredUsers.map((user) => (
                                <li key={user.id} 
                                    className="chat-user" 
                                    onClick={() => onUserSelect(user)}
                                    >
                                    <Link to={`/profile/${user.id}`} className="user-link">
                                        <div className="user-info">
                                            <img 
                                            src={user.profileImage} 
                                            alt={user.username} 
                                            width={40} 
                                            height={40} 
                                            />
                                            <span>{user.username}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                            {/* {filteredUsers.map(user => (
                                <li key={user.id} onClick={() => handleUserClick(user)}> {user.username}</li>
                            ))} */}
                        </ul>
                    )}
                </div>              
            </div>

            <div className="right">
                <Link to="/chat">
                    <Icon path={mdiForumOutline} size={1} color="white"/>
                </Link>
                {/* <Icon path={mdiBellBadgeOutline} size={1} color="white"/> */}
                <div className="p-user">
                    <img src={currentUser.profileImage} alt="" height={30} width={30} />
                    <span>{contextUsername}</span>
                <button onClick={() => handleLogout()} className="button">Log out</button>
            </div>
            </div>
            {selectedUser ? (
                <div className="clickedUser">
                    <UserProfile user={selectedUser} />
                </div>
            ) : null}
        </div>
    )
}

export default NavBar;
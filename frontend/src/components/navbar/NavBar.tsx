import "./navBar.scss";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiCircle, mdiMagnify, mdiForumOutline } from '@mdi/js';
import UserType from "../../types/UserType";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import UserProfile from "../../pages/userProfile/UserProfile";
import UserSearch from "../userSearch/UserSearch";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";
import DefaultProfileImage from './default-profile.jpg';


interface NavBarProps {
    currentUser: UserType | null;
    onUserSelect: (user: UserType) => void;
}

const NavBar: React.FC<NavBarProps> = ({ /* currentUser, */ onUserSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<UserType[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const { currentUser,  setContextUsername, setContextRole } = useUserContext();
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
        setContextRole("");
        setContextUsername("");
        document.cookie = `username=${null}; max-age=0`;
        document.cookie = `role=${null}; max-age=0`;
        document.cookie = `accesstoken=${null}; max-age=0`;
        document.cookie = `refreshtoken=${null}; max-age=0`;
    };

    return (
        <div className="navBar">
            <div className="left">
                <DropdownMenu />
                <Icon path={mdiCircle} size={1} color="purple" />
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="spanTitle">Purple</span>
                </Link>
                <div className="search">
                    <UserSearch onUserSelect={onUserSelect} />
                    <Icon path={mdiMagnify} size={1} color="white" />
                </div>
            </div>

            <div className="right">
                <Link to="/chat">
                    <Icon path={mdiForumOutline} size={1} color="white" />
                </Link>
                <div className="p-user">
                <img
                    src={currentUser ? (currentUser.profileImage || DefaultProfileImage) : DefaultProfileImage}
                    alt="Profile"
                    height={30}
                    width={30}
                    onError={(e) => { e.currentTarget.src = DefaultProfileImage; }}
                />
                    <span>{currentUser?.username || "Logged out"}</span>
                    <button onClick={handleLogout} className="button">Log out</button>
                </div>
            </div>
            {selectedUser && (
                <div className="clickedUser">
                    <UserProfile user={selectedUser} />
                </div>
            )}
        </div>
    );
};

export default NavBar;

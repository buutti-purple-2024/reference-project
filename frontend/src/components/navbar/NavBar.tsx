
import "./navBar.scss";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiCircle } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';
import { mdiForumOutline } from '@mdi/js';
//import { mdiBellBadgeOutline } from '@mdi/js';
import UserType from "../../types/UserType";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
//import { useState, useEffect, useContext } from "react";
//import axios from "axios";
import UserProfile from "../../pages/userProfile/UserProfile";
//import { userContext } from "../../App";
import UserSearch from "../userSearch/UserSearch";

interface NavBarProps {
    currentUser: UserType;
    onUserSelect: (user: UserType) => void;
    selectedUser: UserType | null;
}


const NavBar: React.FC<NavBarProps> = ({ currentUser, onUserSelect, selectedUser }) => {

    return (
        <div className="navBar">
            <div className="left">
                <DropdownMenu/>
                <Icon path={mdiCircle} size={1} color="purple" />
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="spanTitle">Purple</span>
                </Link>
                <div className="search">
                    <UserSearch onUserSelect={onUserSelect}/>
                    {<Icon path={mdiMagnify} size={1} color="white"/>}                              
                </div>              
            </div>

            <div className="right">
                <Link to="/chat">
                    <Icon path={mdiForumOutline} size={1} color="white"/>
                </Link>
                {/* <Icon path={mdiBellBadgeOutline} size={1} color="white"/> */}
                <div className="p-user">
                    <img src={currentUser.profileImage} alt="" height={30} width={30} />
                    <span>{currentUser.username}</span>
                <button className="button">Log out</button>
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
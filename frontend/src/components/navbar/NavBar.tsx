
import "./navBar.scss";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiCircle } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';
import { mdiMenu } from '@mdi/js';
import { mdiForumOutline } from '@mdi/js';
import { mdiBellBadgeOutline } from '@mdi/js';
import UserType from "../../types/UserType";




const NavBar = ({ user }: { user: UserType }) => {
    return (
        <div className="navBar">
            <div className="left">
                <Icon path={mdiMenu} size={1} color="white"/>
                <Icon path={mdiCircle} size={1} color="purple" />
                <Link to="/" style={{textDecoration: "none"}}>
                    <span>Purple</span>
                </Link>
                <div className="search">
                    <Icon path={mdiMagnify} size={1} color="white"/>
                    <input type="text" placeholder="search..." />
                </div>              
            </div>

            <div className="right">
                <Link to="/chat">
                    <Icon path={mdiForumOutline} size={1} color="white"/>
                </Link>
                <Icon path={mdiBellBadgeOutline} size={1} color="white"/>
                <div className="p-user">
                    <img src={user.profileImage} alt="" height={30} width={30} />
                    <span>{user.username}</span>
                <button className="button">Log out</button>
            </div>
                
            </div>
        </div>
    )
}

export default NavBar;

import "./navBar.scss";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiCircle } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';
import { mdiMenu } from '@mdi/js';
import { mdiForumOutline } from '@mdi/js';
import { mdiBellBadgeOutline } from '@mdi/js';




const NavBar = () => {
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
                <Icon path={mdiForumOutline} size={1} color="white"/>
                <Icon path={mdiBellBadgeOutline} size={1} color="white"/>
                <div className="user">
                    <img src="" alt="" height={30} width={30} />
                    <span>LM</span>
                </div>
                
            </div>
        </div>
    )
}

export default NavBar;
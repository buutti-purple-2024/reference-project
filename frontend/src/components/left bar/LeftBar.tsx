
import Icon from '@mdi/react';
import { mdiHomeOutline } from '@mdi/js';
import { mdiAccountOutline } from '@mdi/js';
import { mdiAccountMultipleOutline } from '@mdi/js';
import { Link } from "react-router-dom";
import "./leftBar.scss";



const LeftBar = () => {
    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="item">
                    <Link to="/">
                        <Icon path={mdiHomeOutline} size={1} />
                        <span>Home</span>
                    </Link>
                    </div>
                    <div className="item">
                    <Link to="/profile/:id">
                        <Icon path={mdiAccountOutline} size={1}/>
                        <span>My Profile</span>
                    </Link>
                    </div>
                    <div className="item">
                    <Link to="/friends">
                        <Icon path={mdiAccountMultipleOutline} size={1} />
                        <span>Friends</span>
                    </Link>
                    </div>
                    <div className="item">
                    <Link to="/profileUpdate">
                        <Icon path={mdiAccountOutline} size={1}/>
                        <span>Get/Update profiles</span>
                    </Link>
                    
                    </div>
                    <div className="item">
                    <Link to="/login">
                        <Icon path={mdiAccountOutline} size={1}/>
                        <span>Login test</span>
                    </Link>
                    
                    </div>
                </div>
                <hr/>
                <div className="menu">
                    <span>TOPICS</span>
                    <div className="item">Gaming</div>
                    <div className="item">Nature</div>
                    <div className="item">TV</div>

                </div>
            </div>
        </div>
    )
}

export default LeftBar;
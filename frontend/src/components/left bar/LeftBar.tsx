
import Icon from '@mdi/react';
import { mdiHomeOutline } from '@mdi/js';
import { mdiAccountOutline } from '@mdi/js';
import { mdiAccountMultipleOutline } from '@mdi/js';
import "./leftBar.scss";



const LeftBar = () => {
    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="item">
                        <Icon path={mdiHomeOutline} size={1} />
                        <span>Home</span>
                    </div>
                    <div className="item">
                        <Icon path={mdiAccountOutline} size={1}/>
                        <span>My Profile</span>
                    </div>
                    <div className="item">
                        <Icon path={mdiAccountMultipleOutline} size={1} />
                        <span>Friends</span>
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
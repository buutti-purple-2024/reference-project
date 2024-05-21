import "./chatLeftBar.scss";
import { mdiForumOutline } from '@mdi/js';
import Icon from '@mdi/react';



const ChatLeftBar = () => {
    return (
        <div className="chatLeftBar">
            <Icon path={mdiForumOutline} size={1} color="white"/>
            <span>Direct messages</span>


        </div>
    )
}

export default ChatLeftBar;


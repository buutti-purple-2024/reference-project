
import Icon from '@mdi/react';
import { mdiHomeOutline } from '@mdi/js';
import { mdiAccountOutline, mdiAccountSearch } from '@mdi/js';
import { mdiAccountMultipleOutline } from '@mdi/js';
import { Link } from "react-router-dom";
import "./leftBar.scss";
import { useEffect, useState } from 'react';
import axios from 'axios';



const LeftBar = () => {

    const baseurl = "http://localhost:3001"
    const [topics, setTopics] = useState([])

    useEffect(() => {
        console.log("leftbar")
        const fetchTopics = async () => {
            const response = await axios.get(`${baseurl}/topics`)
            console.log(response)
            setTopics(response.data)
        }
        fetchTopics()
    }, [])

    const mapTopics = () => {
        //topics.map()
    }

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
                    <Link to="/profile/my">
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
                    {/* <div className="item">
                    <Link to="/users">
                    <Icon path={mdiAccountSearch} size={1} />
                        <span>Users</span>
                    </Link>
                    </div> */}
                    {/* <div className="item">
                    <Link to="/profileUpdate">
                        <Icon path={mdiAccountOutline} size={1}/>
                        <span>Get/Update profiles | test</span>
                    </Link>
                    
                    </div> */}
                    {/* <div className="item">
                    <Link to="/login">
                        <Icon path={mdiAccountOutline} size={1}/>
                        <span>Login | test</span>
                    </Link>
                    
                    </div> */}
                </div>
                <hr/>
                <div className="menu">
                    <Link to="/topic">
                    <Icon path={mdiAccountSearch} size={1} />
                        <span>TOPICS</span>
                    </Link>                    <div className="item">Gaming</div>
                    <div className="item">Nature</div>
                    <div className="item">TV</div>

                </div>
                <hr />
                <div className="menu">
                <Link to="/login">
                    <Icon path={mdiAccountOutline} size={1} />
                        <span>Login</span>
                </Link>  
                <Link to="/register">
                    <Icon path={mdiAccountOutline} size={1} />
                        <span>Register</span>
                </Link>                        
                </div>
            </div>
        </div>
    )
}

export default LeftBar;
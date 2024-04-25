import "./post.scss";
//import { mdiBorderAllVariant } from '@mdi/js';
import { mdiDotsHorizontal } from '@mdi/js';
import { mdiArrowDownBoldOutline } from '@mdi/js';
import { mdiArrowUpBoldOutline } from '@mdi/js';
import { mdiMessageOutline } from '@mdi/js';
import { mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import Comments from "../comments/Comments";
import VotingButtons from "./votingTest";

import { Link } from "react-router-dom";
import { useState } from "react";


interface PostItem {
    post: {
      id: number;
      name: string;
      userId: number;
      profilePic: string;
      img: string;
      desc: string;
    };
  }


const Post: React.FC<PostItem> = ({post}) => {
    /* const [liked, setLiked] = useState(false); 

    
    const toggleLike = () => {
        setLiked(!liked);
    }; */

    const [ commentOpen, setCommentOpen ] = useState(false)

    const liked = false;

    return (
        <div className="post">
            <div className="container">
            <div className="user">          
                <div className="userInfo">
                    <img src={post.profilePic} alt="" />
                    <div className="details">
                        <Link 
                            to={`/profile/${post.userId}`} 
                            style={{textDecoration:"none", color:"inherit"}}>
                            <span className="name">{post.name}</span>
                            <Icon path={mdiDragVertical} size={1} />
                        </Link>
                        
                    </div>
                </div>
                <span className="date" justify-content="none">1 min ago</span>
                {/* <Icon path={mdiBorderAllVariant} size={1} /> */}
                <Icon path={mdiDotsHorizontal} size={1} />
                
            </div>
            <div className="content">
                <img src={post.img} alt=""></img>
                <p>{post.desc}</p>
            </div>
            <div className="item-arrow">
          <div className={liked ? "boldArrow" : ""}>
            <Icon path={mdiArrowUpBoldOutline} size={1} />
          </div>
          <div className={!liked ? "boldArrow" : ""}>
            <Icon path={mdiArrowDownBoldOutline} size={1} />
          </div>
          </div>
            <div className="info" onClick={()=>setCommentOpen(!commentOpen)}>
            <Icon path={mdiMessageOutline} size={1} /> 10 comments
            </div>
            {<Comments />}
            <VotingButtons/>
            </div>
        </div>
    );
};

export default Post;
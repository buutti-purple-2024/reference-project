import "./post.scss";
import { mdiDotsHorizontal } from '@mdi/js';
import { mdiMessageOutline } from '@mdi/js';
import { mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import Comments from "../comments/Comments";
import VotingButtons from "../votingButtons/votingButtons";
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
  
  
    const [ commentOpen, setCommentOpen ] = useState(false);

    const toggleCommentSection = () => {
      setCommentOpen(!commentOpen);
    };


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
                <Icon path={mdiDotsHorizontal} size={1} />
            </div>

            <div className="content">
                <img src={post.img} alt=""></img>
                <p>{post.desc}</p>
            </div>

            <div className="info"> 
            <VotingButtons/>
            
            <div className="comment" onClick={toggleCommentSection}>
                  <Icon path={mdiMessageOutline} size={1} /> {commentOpen ? "Hide" : "Show"} comments
              </div>
            </div>
          </div>
          {commentOpen && <div className="comments-container"><Comments /></div>}
        </div>
    );
};

export default Post;
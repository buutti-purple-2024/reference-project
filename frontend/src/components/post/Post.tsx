import "./post.scss";
import { mdiDotsHorizontal } from '@mdi/js';
import { mdiMessageOutline } from '@mdi/js';
import { mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import Comments from "../comments/Comments";
import VotingButtons from "../votingButtons/votingButtons";
import { Link } from "react-router-dom";
import { useState } from "react";
import PostData from "../types/Post";
//import type UserData from "../types/User";
 


const Post: React.FC<{ post: PostData, profileImage: string }> = ({ post, profileImage }) => {
  
    //const [post, setPost] = useState<PostData>(initialPost);

    const [ commentOpen, setCommentOpen ] = useState(false);

    const toggleCommentSection = () => {
      setCommentOpen(!commentOpen);
    };


    return (
        <div className="post">
            <div className="container">
            <div className="user">          
                <div className="userInfo">
                  {profileImage && <img src={profileImage} alt="" />}
                    <div className="details">
                        <Link 
                            to={`/profile/${post.user_id}`} 
                            style={{textDecoration:"none", color:"inherit"}}>
                            {/* <span className="name">{title}</span> */}
                            <Icon path={mdiDragVertical} size={1} />
                        </Link>
                        
                    </div>
                </div>
                <span className="date" justify-content="none">{post.created_at}</span>
                <Icon path={mdiDotsHorizontal} size={1} />
                
            </div>
            <div className="content">
                <img src={post.post_img} alt=""></img>
                <p>{post.content}</p>
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
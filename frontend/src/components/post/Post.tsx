import "./post.scss";
import { mdiDotsHorizontal } from '@mdi/js';
import { mdiMessageOutline } from '@mdi/js';
import { mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import Comments from "../comments/Comments";
import VotingButtons from "../votingButtons/votingButtons";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import PostType from "../../types/PostType";
import UsersContext from "../../contexts/UsersContext";
import CommentsContext from "../../contexts/CommentsContext";
//import fakeComments from "../../tempData/fakeComments";
//import fakeUsers from "../../tempData/fakeUsers";
import WriteComment from "../comments/WriteComment";
//import UserType from "../types/User";


const Post: React.FC<{ post: PostType, username: string, profileImage: string }> = ({ post, username, profileImage }) => {
  
    const [ commentOpen, setCommentOpen ] = useState(false);
    const comments = useContext(CommentsContext);
    const users = useContext(UsersContext);

    const toggleCommentSection = () => {
      setCommentOpen(!commentOpen);
    };


    return (
      <div className="post">
          <div className="postContainer">
            <div className="postInfo">
                <div className="userInfo">
                    {profileImage && <img src={profileImage} alt="" />}
                    {username}
                    <div className="details" >
                        <Link 
                            to={`/profile/${post.user_id}`} 
                            style={{textDecoration:"none", color:"inherit"}}>
                            <Icon path={mdiDragVertical} size={1} />
                        </Link>
                    </div>
                </div>

                <span className="date" justify-content="none">{post.created_at}</span>
                <Icon path={mdiDotsHorizontal} size={1} />
            </div>

            <div className="postContent">
            <img src={post.image || ''} alt=""/>
                <h5>{post.title}</h5>
                <p>{post.content}</p>
            </div>

            <div className="info"> 
              <VotingButtons upvotes={post.upvotes} downvotes={post.downvotes} />
              <div className="comment" onClick={toggleCommentSection}>
                  <Icon path={mdiMessageOutline} size={1} /> {commentOpen ? "Hide" : "Show"} comments
              </div>
            </div> 

          <div>
            {commentOpen && (
              <div className="comments-container">
                <Comments comments={comments} users={users} />
              </div>
            )}
          </div>
          
          <div>
              <WriteComment/>
          </div>
            
          </div>
    </div>
  );
};

export default Post;
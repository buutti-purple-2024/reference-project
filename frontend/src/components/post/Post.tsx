import "./post.scss";
import { mdiDotsHorizontal } from '@mdi/js';
import { mdiMessageOutline } from '@mdi/js';
import { mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import Comments from "../comments/Comments";
import VotingButtons from "../votingButtons/votingButtons";
import { Link } from "react-router-dom";
import { useState } from "react";
import PostType from "../../types/PostType";
import fakeComments from "../../tempData/fakeComments";
import fakeUsers from "../../tempData/fakeUsers";
//import UserType from "../types/User";


const Post: React.FC<{ post: PostType, username: string, profileImage: string, upvotes: number, downvotes: number }> = ({ post, username, profileImage }) => {
  
    //const [post, setPost] = useState<PostType>(initialPost);

    const [ commentOpen, setCommentOpen ] = useState(false);

    const toggleCommentSection = () => {
      setCommentOpen(!commentOpen);
    };


    return (
      <div className="post">
          <div className="container">
            <div className="postInfo">
                <div className="userInfo">
                    {profileImage && <img src={profileImage} alt="" />}
                    {username}
                    <div className="details" >
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
              <VotingButtons upvotes={post.upvotes} downvotes={post.downvotes} />
              <div className="comment" onClick={toggleCommentSection}>
                  <Icon path={mdiMessageOutline} size={1} /> {commentOpen ? "Hide" : "Show"} comments
              </div>
            </div>
          
            {commentOpen && (
              <div className="comments-container">
                <Comments comments={fakeComments} users={fakeUsers} />
              </div>
            )}
          </div>
    </div>
  );
};

export default Post;
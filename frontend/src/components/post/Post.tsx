import "./post.scss";
import { mdiDotsHorizontal } from '@mdi/js';
import { mdiMessageOutline } from '@mdi/js';
import { mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import Comments from "../comments/Comments";
import VotingButtons from "../votingButtons/votingButtons";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import PostType from "../../types/PostType";
import CommentType from "../../types/CommentType";
import UsersContext from "../../contexts/UsersContext";
import {CommentsProvider} from "../../contexts/CommentsContext";
import WriteComment from "../comments/WriteComment";
import axios from "axios";


interface PostProps {
  post: PostType;
  username: string;
  profileImage: string;
  upvotes: number;
  downvotes: number;
  post_id: number;
}

const Post: React.FC<PostProps> = ({ post, username, profileImage, upvotes, downvotes }) => {
  
    const [ commentOpen, setCommentOpen ] = useState(false);
    const [ comments, setComments] = useState<CommentType[]>([]);
   // const {comments} = useContext(CommentsContext);
    const users = useContext(UsersContext);

    const toggleCommentSection = () => {
      setCommentOpen(!commentOpen);
    };

    useEffect(() => {
      // Fetch initial comments when the component mounts
      const fetchComments = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/comments?postId=${post.post_id}`, { withCredentials: true });
          setComments(response.data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
      fetchComments();
    }, [post.post_id]);

    const addComment = (newComment: CommentType) => {
      setComments(prevComments => [newComment, ...prevComments]);
  };
    
    const filterComments = comments.filter(comment => comment.post_id === post.post_id);
    const countPostComments = filterComments.length;

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
              <VotingButtons upvotes={upvotes} downvotes={downvotes} post_id={post.post_id} />
              <div className="comment" onClick={toggleCommentSection}>
                  <Icon path={mdiMessageOutline} size={1} /> 
                  {commentOpen ? "Hide" : "Show"} comments
                  {` (${countPostComments})`}
              </div>
            </div> 

          <div>
            {commentOpen && (
              <div className="comments-container">
                <CommentsProvider postId={post.post_id}>
                  <Comments postId={post.post_id} users={users} comments={comments} />
                </CommentsProvider>
              </div>
            )}
          </div>
          
          <div>
              <WriteComment postId={post.post_id} addComment={addComment}/>
          </div>
            
          </div>
    </div>
  );
};

export default Post;
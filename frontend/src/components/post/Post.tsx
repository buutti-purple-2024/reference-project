import "./post.scss";
import { mdiDotsHorizontal, mdiMessageOutline, mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import Comments from "../comments/Comments";
import VotingButtons from "../votingButtons/votingButtons";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import PostType from "../../types/PostType";
import CommentType from "../../types/CommentType";
import UsersContext from "../../contexts/UsersContext";
import { CommentsProvider } from "../../contexts/CommentsContext";
import WriteComment from "../comments/WriteComment";
import axios from "axios";
import { userContext } from "../../App";

interface PostProps {
  post: PostType;
  username: string;
  profileImage: string;
  upvotes: number;
  downvotes: number;
  post_id: number;
  refreshPosts: () => void;  // Add this prop
}

const Post: React.FC<PostProps> = ({ post, username, profileImage, upvotes, downvotes, refreshPosts }) => {
    const {contextUsername, contextRole} = useContext(userContext)
    const [ commentOpen, setCommentOpen ] = useState(false);
    const [ comments, setComments] = useState<CommentType[]>([]);
    const users = useContext(UsersContext);

    const toggleCommentSection = () => {
      setCommentOpen(!commentOpen);
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/comments?postId=${post.post_id}`, { withCredentials: true });
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    useEffect(() => {
      fetchComments();
    }, [post.post_id]);

    const addComment = (newComment: CommentType) => {
      setComments(prevComments => [newComment, ...prevComments]);
    };
    
    const getImageUrl = (image: string | null) => {
      if (!image) {
        return '';
      }
      const isExternalUrl = image.startsWith('http://') || image.startsWith('https://');
      return isExternalUrl ? image : `http://localhost:3001/${image}`;
    };

    const filterComments = comments.filter(comment => comment.post_id === post.post_id);
    const countPostComments = filterComments.length;

    const deletePost = async () => {
      console.log(post.post_id)
      try {
        const deletedPost = await axios.delete(`http://localhost:3001/posts/${post.post_id}`, {withCredentials: true})
        console.log(deletedPost)
        refreshPosts();
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <div className="post">
        {console.log(post, username)}
        <div className="postContainer">
          <div className="postInfo">
            <div className="userInfo">
              {profileImage && <img src={profileImage} alt="" />}
              {username}
              <div className="details">
                <Link to={`/profile/${post.user_id}`} 
                style={{ textDecoration: "none", color: "inherit" }}>
                  <Icon path={mdiDragVertical} size={1} />
                </Link>
                </div>
              </div>
              
              <span className="date" justify-content="none">{post.created_at}</span>
                <Icon path={mdiDotsHorizontal} size={1} />
              </div>

            <div className="postContent">
              {post.image && <img src={getImageUrl(post.image)} alt="Post Image" />}
              <h5>{post.title}</h5>
              <p>{post.content}</p>
            </div>

            <div className="info"> 
              <VotingButtons upvotes={upvotes} downvotes={downvotes} post_id={post.post_id} />
              <div className="comment" onClick={countPostComments > 0 ? toggleCommentSection : undefined}
                      style={{ cursor: countPostComments > 0 ? "pointer" : "default" }}>
                  <Icon path={mdiMessageOutline} size={1} /> 
                  {countPostComments > 0 ? (commentOpen ? "Hide" : "Show") + ` comments (${countPostComments})` : "No comments"}
                  { (username == contextUsername || contextRole == "admin") && <button onClick={() => deletePost()}>Delete Post</button>}
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
                <WriteComment postId={post.post_id} addComment={addComment} refreshComments={fetchComments}/>
            </div>

          </div>
      </div>
    );
  };

export default Post;

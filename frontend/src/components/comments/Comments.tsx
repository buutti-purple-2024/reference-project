import "./comments.scss";
import CommentsContext from "../../contexts/CommentsContext";
import UsersContext from "../../contexts/UsersContext";
import { useContext } from 'react';


const Comments: React.FC = () => {
    
    const comments  = useContext(CommentsContext);
    const  users  = useContext(UsersContext);

    return (
        <div className="comments">{

            comments.map(comment => { // Find the user associated with the comment
                const user = users.find(user => user.id === comment.user_id);
                if (!user) return null; // Handle if user is not found
                
                return (
                    <div className="comment" key={comment.comment_id}>
                        <img src={user.profileImage} alt="" />
                        <span>{user.username}</span>
                        <div className="info">
                            <span>{comment.content}</span>
                        </div>
                        <span className="date">{comment.created_at}</span>
                     </div>
                 );
            })
        }
    </div>
    )
};

export default Comments;
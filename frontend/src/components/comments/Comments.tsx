import "./comments.scss";
import CommentData from "../types/Comment";


const Comments: React.FC<{ comments: CommentData[], profileImage: string }> = ({comments, profileImage}) => {

    // Temp
 
   
    return (
        <div className="comments">{
            comments.map(comment=>(
                <div className="comment" key={comment.comment_id}>
                <img src={profileImage} alt="" />
                    <div className="info">
                        <span>{comment.content}</span>
                    </div>
                    <span className="date">{comment.created_at}</span>
                </div>
            ))
        }
    </div>
    )
};

export default Comments;
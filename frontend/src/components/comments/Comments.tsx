import "./comments.scss";
import CommentData from "../types/Comment";

//import fakeUsers from "../../tempData/fakeUsers";

const Comments: React.FC<{ comments: CommentData[], profileImage: string, username: string }> = ({comments, profileImage, username}) => {

   
    return (
        <div className="comments">{
            comments.map(comment=>(
                <div className="comment" key={comment.comment_id}>
                <img src={profileImage} alt="" />

                <span>{username}</span>

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
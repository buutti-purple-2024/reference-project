import "./post.scss";
import { mdiBorderAllVariant } from '@mdi/js';
import Icon from '@mdi/react';
import { Link } from "react-router-dom";

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
    return (
        <div className="Post">
            <div className="user">
                <div className="container">
                <div className="userInfo">
                    <img src={post.img} alt="" />
                    <div className="details">
                        <Link to={`/profile/${post.userId}`} style={{textDecoration:"none", color:"inherit"}}>
                            <span>{post.name}</span>
                        </Link>
                        <span className="date">1 min ago</span>
                    </div>
                <Icon path={mdiBorderAllVariant} size={1} />

                </div>
            </div>
            <div className="content"></div>
            <div className="info"></div>
            </div>
        </div>
    )
}

export default Post;
import "./posts.scss";
import Post from "../post/Post";
import PostType from "../../types/PostType";
import UserType from "../../types/UserType";
//import fakeUsers from "../../tempData/fakeUsers";

interface PostProps {
    posts: PostType[]; 
    users: UserType[];
}

const Posts: React.FC<PostProps> = ({posts, users}) => {

    return (
    <div className="posts">
        {posts.map(post => {
                
                const user = users.find(user => user.id === post.user_id);
                
                return <Post key={post.post_id} post={post} username={user?.username || ''} profileImage={user?.profileImage || ''} />;
            })}
    </div>

    )
}

export default Posts;
import "./posts.scss";
import Post from "../post/Post";
import PostData from "../types/Post";
import UserData from "../types/User";
//import fakeUsers from "../../tempData/fakeUsers";



interface Props {
    posts: PostData[]; 
    users: UserData[]; 
}

const Posts: React.FC<Props> = ({posts, users}) => {

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
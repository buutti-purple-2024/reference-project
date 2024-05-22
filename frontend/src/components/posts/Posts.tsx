import "./posts.scss";
import Post from "../post/Post";
import UsersContext from "../../contexts/UsersContext";
import UsersPostsContext from "../../contexts/UsersPostsContext";
import { useContext } from 'react';


const Posts: React.FC = () => {

    const  users  = useContext(UsersContext);
    const  usersPosts  = useContext(UsersPostsContext);
    const posts = Object.values(usersPosts).flatMap(userPosts => userPosts);


    return (
    <div className="posts">
        {posts.map(post => {
                
                const user = users.find(user => user.id === post.user_id);
                
                return <Post 
                    key={post.post_id} 
                    post={post} 
                    username={user?.username || ''} 
                    profileImage={user?.profileImage || ''} 
                    upvotes={post.upvotes}
                    downvotes={post.downvotes}
                    />;
                    
            })}
    </div>

    )
}

export default Posts;
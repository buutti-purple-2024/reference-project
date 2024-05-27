import "./posts.scss";
import Post from "../post/Post";
import PostType from "../../types/PostType";

interface PostWithUser extends PostType {
  user: {
    username: string;
    profileImage?: string;
  }
}

interface PostsProps {
  posts: PostWithUser[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {

    const mapPosts = () => {
      return posts.map(post => (
        <Post 
            key={post.post_id} 
            post={post} // prop includes e.g. image, title & content
            username={post.user.username || ''}
            profileImage={post.user.profileImage || ''}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
        />
      ));
    };

    return (
      <div className="posts">
        {posts && posts.length > 0 ? mapPosts() : <p>No posts available</p>}
      </div>
    );
}

export default Posts;

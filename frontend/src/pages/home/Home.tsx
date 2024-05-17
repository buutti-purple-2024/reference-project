import "./home.scss";
import Posts from "../../components/posts/Posts";
import CreatePost from "../../components/createPost/CreatePost";
import allUsersPosts from "../../tempData/allUsersPosts";
import fakeUsers from "../../tempData/fakeUsers";
import PostsAxios from "../../components/posts/PostsAxios";


const Home = () => {
    return (
        <div className="home">
            <CreatePost />
            <h2>Recent posts</h2>
            <Posts posts={allUsersPosts} users={fakeUsers}/>
            <PostsAxios/>
        </div>
    )
}

export default Home
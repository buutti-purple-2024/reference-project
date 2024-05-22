import "./home.scss";
//import Posts from "../../components/posts/Posts";
import CreatePost from "../../components/createPost/CreatePost";
//import allUsersPosts from "../../tempData/allUsersPosts";
//import fakeUsers from "../../tempData/fakeUsers";
import PostsAxios from "../../components/posts/Posts";


const Home = () => {
    return (
        <div className="home">
            <CreatePost />
            <h2>Posts fetched from backend</h2>
            <PostsAxios/>
        </div>
    )
}

export default Home
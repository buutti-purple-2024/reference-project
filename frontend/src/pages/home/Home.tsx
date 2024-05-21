import "./home.scss";
//import Posts from "../../components/posts/Posts";
import CreatePost from "../../components/createPost/CreatePost";
//import allUsersPosts from "../../tempData/allUsersPosts";
//import fakeUsers from "../../tempData/fakeUsers";
import PostsAxios from "../../components/posts/PostsAxios";


const Home = () => {
    return (
        <div className="home">
            <CreatePost />
            <PostsAxios/>
        </div>
    )
}

export default Home

//<Posts posts={allUsersPosts} users={fakeUsers}/>
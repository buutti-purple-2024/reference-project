import "./home.scss";
//import Posts from "../../components/posts/Posts";
//import allUsersPosts from "../../tempData/allUsersPosts";
//import fakeUsers from "../../tempData/fakeUsers";
import Posts from "../../components/posts/Posts";
import PostCreate from "../../components/postCreate/PostCreate";


const Home = () => {
    return (
        <div className="home">
            <PostCreate />
            <h2>Posts fetched from backend</h2>
            <Posts/>
        </div>
    )
}

export default Home
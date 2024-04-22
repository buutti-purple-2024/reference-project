import "./home.scss";
import Posts from "../../components/posts/Posts";
import CreatePost from "../../components/createPost/CreatePost";

const Home = () => {
    return (
        <div className="home">
            <CreatePost />
            <h2>Recent posts</h2>
            <Posts />
        </div>
    )
}

export default Home
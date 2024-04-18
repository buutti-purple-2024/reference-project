import "./posts.scss";
import Post from "../post/Post";


const Posts = () => {

    interface PostsData { 
        id: number;
        name: string;
        userId: number;
        profilePic: string;
        img: string;
        desc: string;
      }

    const posts: PostsData[] = 
    [
        {
            id: 1,
            name: "John D",
            userId: 1,
            profilePic: "https://www.pexels.com/photo/madeira-island-20433045/",
            img: "",
            desc: "Some text here"
        },
        {
            id: 2,
            name: "Jane D",
            userId: 2,
            profilePic: "https://www.pexels.com/photo/alluring-woman-in-black-dress-leaning-on-a-post-10106884/",
            img: "",
            desc: "Some text here"
        },
    ];

    return (
    <div className="posts">
        {posts.map(post=>(
            <Post post={post} key={post.id}/>
        ))}
    </div>
    
    )
}

export default Posts;
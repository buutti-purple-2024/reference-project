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
            profilePic: "https://images.pexels.com/photos/12160702/pexels-photo-12160702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            img: "https://images.pexels.com/photos/10106884/pexels-photo-10106884.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            desc: "Some text here"
        },
        {
            id: 2,
            name: "Jane D",
            userId: 2,
            profilePic: "https://images.pexels.com/photos/21391541/pexels-photo-21391541/free-photo-of-parakeet-on-winter-morning.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            img: "https://images.pexels.com/photos/20975683/pexels-photo-20975683/free-photo-of-a-black-and-white-photo-of-a-horse-jumping-over-an-obstacle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
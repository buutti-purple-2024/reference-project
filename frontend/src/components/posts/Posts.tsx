import "./posts.scss";
import Post from "../post/Post";
import PostData from "../types/Post";
import UserData from "../types/User";



const Posts:  React.FC<{ post: PostData }> = () => {

    const users: UserData[] =
    [
        {
            id: 1,
            username: "Jane Doe",
            password: "password1",
            role: "user",
            token: "",
            tokenExpire: "",
            createdAt: new Date().toISOString(),
            profileText: "this is user 1",
            profileImage: "https://images.pexels.com/photos/12160702/pexels-photo-12160702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            posts: 1,
            follows: 0,
        },
        {
            id: 2,
            username: "John Doe",
            password: "password2",
            role: "user",
            token: "",
            tokenExpire: "",
            createdAt: new Date().toISOString(),
            profileText: "this is user 2",
            profileImage: "https://images.pexels.com/photos/21391541/pexels-photo-21391541/free-photo-of-parakeet-on-winter-morning.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            posts: 1,
            follows: 0,
        },
        {
            id: 3,
            username: "Jeremy Doe",
            password: "password3",
            role: "user",
            token: "",
            tokenExpire: "",
            createdAt: new Date().toISOString(),
            profileText: "this is user 3",
            profileImage: "https://images.pexels.com/photos/19932535/pexels-photo-19932535/free-photo-of-bride-in-wedding-dress-with-hand-raised.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            posts: 1,
            follows: 0,
        }
        
    ]


    const posts: PostData[] = 
    [
        {
            post_id: 1,
            user_id: 1,
            title: "title1",
            post_img: "https://images.pexels.com/photos/10106884/pexels-photo-10106884.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            content: "Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here ",
            created_at: new Date().toISOString(),
            upvotes: 0,
            downvotes: 0,
        },
        {
            post_id: 2,
            user_id: 2,
            title: "title2",
            post_img: "https://images.pexels.com/photos/20975683/pexels-photo-20975683/free-photo-of-a-black-and-white-photo-of-a-horse-jumping-over-an-obstacle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            content: "Some text here Some text here Some text here Some text here ",
            created_at: new Date().toISOString(),
            upvotes: 0,
            downvotes: 0,
        },
        {
            post_id: 3,
            user_id: 3,
            title: "title3",
            post_img: "https://images.pexels.com/photos/17965550/pexels-photo-17965550/free-photo-of-adorable-kitten-on-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            content: "Some text here Some text here Some text here Some text here ",
            created_at: new Date().toISOString(),
            upvotes: 0,
            downvotes: 0,
        },
    ];

    return (
    <div className="posts">
        {posts.map(post => {
                
                const user = users.find(user => user.id === post.user_id);
                
                return <Post key={post.post_id} post={post} profileImage={user?.profileImage || ''} />;
            })}
    </div>
    
    )
}

export default Posts;
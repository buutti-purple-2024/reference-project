import PostData from "../components/types/Post";


const profileUserPosts: PostData[] = 
    [
        {
            post_id: 4,
            user_id: 1,
            title: "title4",
            post_img: "https://images.pexels.com/photos/21387353/pexels-photo-21387353/free-photo-of-young-woman-reading-a-book-in-front-of-an-old-carved-door.jpeg",
            content: "Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here ",
            created_at: new Date().toISOString(),
            upvotes: 0,
            downvotes: 0,
        },
        {
            post_id: 5,
            user_id: 1,
            title: "title5",
            post_img: "https://images.pexels.com/photos/14280103/pexels-photo-14280103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            content: "Some text here Some text here Some text here Some text here ",
            created_at: new Date().toISOString(),
            upvotes: 0,
            downvotes: 0,
        },
        {
            post_id: 6,
            user_id: 1,
            title: "title6",
            post_img: "https://images.pexels.com/photos/19140977/pexels-photo-19140977/free-photo-of-view-of-a-large-rocky-fjord.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
            content: "Some text here Some text here Some text here Some text here ",
            created_at: new Date().toISOString(),
            upvotes: 0,
            downvotes: 0,
        },
    ];

export default profileUserPosts;
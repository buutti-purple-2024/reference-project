import PostType from "../types/PostType";
//temp data
const randomUsersPosts: PostType[] = 
    [
        {
            post_id: 1,
            user_id: 2,
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

export default randomUsersPosts;
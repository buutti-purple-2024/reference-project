import PostType from "../types/PostType";
//temp data
const allUsersPosts: PostType[] = 
    [
        {
            post_id: 1,
            user_id: 2,
            title: "title1",
            post_img: "https://images.pexels.com/photos/10106884/pexels-photo-10106884.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            content: "Testing testing... Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here ",
            created_at: new Date().toISOString(),
            upvotes: 10,
            downvotes: 2,
        },
        {
            post_id: 2,
            user_id: 2,
            title: "title2",
            post_img: "https://images.pexels.com/photos/20975683/pexels-photo-20975683/free-photo-of-a-black-and-white-photo-of-a-horse-jumping-over-an-obstacle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            content: "Some text here Some text here Some text here Some text here ",
            created_at: new Date().toISOString(),
            upvotes: 7,
            downvotes: 8,
        },
        {
            post_id: 3,
            user_id: 4,
            title: "title3",
            post_img: "https://images.pexels.com/photos/17965550/pexels-photo-17965550/free-photo-of-adorable-kitten-on-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            content: "Some text here Some text here Some text here Some text here ",
            created_at: new Date().toISOString(),
            upvotes: 39,
            downvotes: 5,
        },
        {
            post_id: 4,
            user_id: 4,
            title: "title4",
            post_img: "https://images.pexels.com/photos/21387353/pexels-photo-21387353/free-photo-of-young-woman-reading-a-book-in-front-of-an-old-carved-door.jpeg",
            content: "Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here Some text here ",
            created_at: new Date().toISOString(),
            upvotes: 95,
            downvotes: 0,
        },
        {
            post_id: 5,
            user_id: 1,
            title: "title5",
            post_img: "https://images.pexels.com/photos/14280103/pexels-photo-14280103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            content: "Some text here Some text here Some text here Some text here ",
            created_at: new Date().toISOString(),
            upvotes: 26,
            downvotes: 2,
        },
        {
            post_id: 6,
            user_id: 1,
            title: "title6",
            post_img: "https://images.pexels.com/photos/19140977/pexels-photo-19140977/free-photo-of-view-of-a-large-rocky-fjord.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
            content: "Some text here Some text here Some text here Some text here ",
            created_at: new Date().toISOString(),
            upvotes: 0,
            downvotes: 4,
        },
    ];

export default allUsersPosts;
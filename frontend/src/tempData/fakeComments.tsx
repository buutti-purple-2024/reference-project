import CommentData from "../components/types/Comment";

// temp data
const fakeComments: CommentData[] = [
    {
        comment_id: 1,
        user_id: 2,
        post_id: 1,
        created_at: new Date().toISOString(),
        content: "Some comment here Some comment here Some comment here Some comment here",
    },
    {
        comment_id: 2,
        user_id: 3,
        post_id: 2,
        created_at: new Date().toISOString(),
        content: "Some another comment here Some another comment here Some another comment here Some another comment here Some another comment here",
    },
  ];

export default fakeComments;
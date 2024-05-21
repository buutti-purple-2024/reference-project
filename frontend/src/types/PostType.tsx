
interface PostType {
    post_id: number;
    user_id: number;
    title?: string;
    image?: string;
    content: string;
    created_at: string;
    upvotes: number;
    downvotes: number;
}

export default PostType;
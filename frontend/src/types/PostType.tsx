
interface PostType {
    post_id: number;
    user_id: number;
    title?: string;
    image?: string | Blob | File | null;
    content: string;
    created_at: string;
    upvotes: number;
    downvotes: number;
    topic: string;
    topic_id: number;
}

export default PostType;
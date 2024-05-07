

interface PostType {
    post_id: number;
    user_id: number;
    title?: string;
    post_img?: string;
    content: string;
    created_at: string;
    upvotes: number;
    downvotes: number;
}

export default PostType;
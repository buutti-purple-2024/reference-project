interface CommentData {
    comment_id: number;
    user_id: number;
    post_id: number;
    content: string;
    created_at: string; // DateTime where???
}

export default CommentData;
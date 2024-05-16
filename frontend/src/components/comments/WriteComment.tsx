import { useState, ChangeEvent, FormEvent } from "react";
import CommentType from "../../types/CommentType";
import "./writeComment.scss";

const initialState: CommentType = { 
        comment_id: 0,
        user_id: 0,
        post_id: Math.random(),
        created_at: new Date().toISOString(),
        content: "",
    }

    export default function WriteComment() {

    const [comment, setComment] = useState<CommentType>(initialState);
    const [submit, setSubmit] = useState<CommentType>(initialState);

    function handleComment(e: ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        setComment({...comment, content: e.target.value})
    }
   
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmit(comment);
        setComment(initialState);
        console.log(submit.content)
    }
    return(
        <div className="commentForm">
            <form onSubmit={(e) => handleSubmit(e)}>
                <textarea
                    value={comment.content}
                    onChange={(e) => handleComment(e)}
                    name="writeComment"
                    id="writeComment"
                    rows={1}
                    placeholder="Write a comment. Be nice!" />
                <button type="submit">Send</button>
            </form>
        </div>

    )
}
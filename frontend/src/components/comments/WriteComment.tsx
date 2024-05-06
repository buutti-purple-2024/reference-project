/* import CommentItem from "../comments/Comments"

export default function WriteComment() {

    const [comment, setComment] = useState();
    const [submit, setSubmit] = useState();

    function handleComment(e) {
        e.preventDefault();
        setComment(comment.desc)
    }
   
    function handleSubmit(e) {
        e.preventDefault();
        setSubmit();
        setComment();
    }
    return(
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    onChange={(e) => handleComment(e)}
                    name="writeComment"
                    id="writeComment"
                    type="text"
                    placeholder="Write a comment. Be nice!" />
                <button type="submit">Send</button>
            </form>
        </div>

    )
};
*/
import "./createPost.scss";

const CreatePost = () => {
    return (
        <div className="createpost">
                <h2>Create a Post</h2>
                <form>
                    <input type="text" title="Title" placeholder="Enter post title" />
                    <input type="text" title="Content" placeholder="Share your thoughts" />
                    <button>Add a picture</button>    
                </form>
                <button type="reset">Cancel</button>     
                <button type="submit">Post</button>
            <hr/>
        </div>
    )
}

export default CreatePost
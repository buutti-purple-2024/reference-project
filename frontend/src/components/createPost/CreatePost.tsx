import "./createPost.scss";

const CreatePost = () => {
    return (
        <div className="createpost">
            <div className="card">
                <h2>Create a Post</h2>
                <form>
                    <div>
                        <input type="text" title="Title" placeholder="Enter post title" />
                    </div>
                    <div>
                        <input type="text" title="Content" placeholder="Share your thoughts" />
                        <button>Add a picture</button>                    
                    </div>
                    <div>
                        <button type="reset">Cancel</button>     
                        <button type="submit">Post</button>
                    </div>
                </form>

            <hr/>
            </div>
        </div>
    )
}

export default CreatePost
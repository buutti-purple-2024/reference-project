import "./createPost.scss";
import { useState, ChangeEvent, FormEvent } from "react";
import PostData from "../types/Post";

export default function CreatePost() {
    return (
        <FormInput/>
    )
}


const initialState = {post_id: 0, user_id: 1, title: "", content: "", created_at: "", upvotes: 0, downvotes: 0}

function FormInput() {
    
    const [post, setPost] = useState<PostData>(initialState)
    
    const [submit, setSubmit] = useState<PostData>();

    function handleTitle(e: ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        setPost({...post, title: e.target.value});
    }
    
    function handleContent(e: ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        setPost({...post, content: e.target.value});
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        setSubmit(post);
        setPost(initialState);
    }
    
    function handleReset(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        setSubmit(initialState);
        setPost(initialState);
    }

    return (
    <form onSubmit={(e) => handleSubmit(e)} >
        <div className="form-container">
                <h2>Create a Post</h2>

                <label htmlFor="title">Title</label>
                <input 
                    value={post.title}
                    onChange={(e) => handleTitle(e)} // e näyttää, että tyyppi on "ChangeEvent<HTMLInputElement>" >> kopio ja laita tyyppi handle-funktioon & importtiin
                    name="title"
                    id="title"
                    type="text" 
                    placeholder="Enter post title" 
                />
                <label htmlFor="content">Content</label>
                <input
                    value={post.content}
                    onChange={(e) => handleContent(e)}
                    name="content"
                    id="content"
                    type="text" 
                    placeholder="Share your thoughts" 
                />
                <input //kuvan lisääminen koodattava myöhemmin
                    type="file"
                    name="chooseFile"
                    id="chooseFile"
                    accept="image/png, image/jpeg"
                />
                <button type="submit">Submit</button>
                <button type="reset" onClick={e=>handleReset(e)}>Reset</button>     
        </div>
        <p>{submit?.title}</p>
        <p>{submit?.content}</p>
    </form>
    )
}
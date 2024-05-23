import "./postCreate.scss";
import { useState, ChangeEvent, FormEvent } from "react";
import PostType from "../../types/PostType";
import axios from "axios";


// post/posts

export default function PostCreate() {
    return (
        <FormInput/>
    )
}


function FormInput() {

    const initialState = {post_id: 0, user_id: 1, title: "", content: "", created_at: "", upvotes: 0, downvotes: 0}

    const baseurl = "http://localhost:3001";
    
    const [post, setPost] = useState<PostType>(initialState)
    const [submit, setSubmit] = useState<PostType>();


   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newSubmit = {...post, post_id: Math.random() }
        try {
            await axios.post(`${baseurl}/posts`, newSubmit);
            setSubmit(newSubmit)
            setPost(initialState)
        } catch (error) {
            console.error("error submitting post:", error)
        }
    }

    function handleTitle(e: ChangeEvent<HTMLInputElement>){
        //e.preventDefault();
        setPost({...post, title: e.target.value});
    }
    
    function handleContent(e: ChangeEvent<HTMLTextAreaElement>){
        //e.preventDefault();
        setPost({...post, content: e.target.value});
    }

    function handleReset(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        setSubmit(undefined);
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
                <textarea
                    value={post.content}
                    onChange={(e) => handleContent(e)}
                    name="content"
                    id="content"
                    placeholder="Share your thoughts"
                    rows={4}
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
        {submit && (
            <>
                <p>{submit.title}</p>
                <p>{submit.content}</p>
            </>
    )}

    </form>
    )
}       


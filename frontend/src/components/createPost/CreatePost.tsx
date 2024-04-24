import "./createPost.scss";
import { useState, ChangeEvent, FormEvent } from "react";

export default function CreatePost() {
    return (
        <FormInput/>
    )
}

interface PostType {
    title?: string | number;
    content: string | number;
}

const initialState = {title: "", content: ""}

function FormInput() {
    
    const [post, setPost] = useState<PostType>(initialState)
    
    const [submit, setSubmit] = useState<PostType>();

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

    return (
    <form onSubmit={(e) => handleSubmit(e)} >
        <div className="container">
                <h2>Create a Post</h2>
                <input 
                    value={post.title}
                    onChange={(e) => handleTitle(e)} // e näyttää, että tyyppi on "ChangeEvent<HTMLInputElement>" >> kopio ja laita tyyppi handle-funktioon & importtiin
                    type="text" 
                    title="Title" 
                    placeholder="Enter post title" 
                />
                <input
                    value={post.content}
                    onChange={(e) => handleContent(e)}
                    type="text" 
                    title="Content" 
                    placeholder="Share your thoughts" 
                />
                <button>pic</button>
                <button type="submit">Submit</button>
                <button type="reset">Cancel</button>     
        </div>
        <p>{submit?.title}</p>
        <p>{submit?.content}</p>
    </form>
    )
}
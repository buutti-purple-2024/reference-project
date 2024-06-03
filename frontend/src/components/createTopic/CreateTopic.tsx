import "./createTopic.scss";
import { useState, ChangeEvent, FormEvent } from "react";
//import { useRef } from "react";
import PostType from "../../types/PostType";
import axios from "axios";


const CreateTopic = () => {

  /*
    const initialState: TopicType = {
        title: "", 
        description: "",
        image: null,
    }
    */

    const baseurl = "http://localhost:3001";
    
    const [post, setPost] = useState({title: "", description: "", image: null});
    //const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            try {
                await axios.post(`${baseurl}/topics`, post, {withCredentials: true});
                //setPost(initialState)
                console.log(post)
            } catch (error) {
                console.error("error submitting post:", error)
            }
        }

    function handleTitle(e: ChangeEvent<HTMLInputElement>){
        setPost({...post, title: e.target.value});
    }
    
    function handleDescription(e: ChangeEvent<HTMLTextAreaElement>){
        setPost({...post, description: e.target.value});
    }

    //IMAGE
    
    function handleImage(e: ChangeEvent<HTMLInputElement>) {
      return
      /*
        if (e.target.files) {
            setPost({...post, image: e.target.files[0]});
            console.log("image path: " + e.target.value);
        }
        */
    }
    

    function handleReset(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        //setPost(initialState);
        /*if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the file input. Check: https://www.geeksforgeeks.org/how-to-reset-a-file-input-in-react-js/
        }
        */
    }

    return (
    <form onSubmit={(e) => handleSubmit(e)} >
        <div className="form-container">
                <h2>Create a Community</h2>

                <label htmlFor="title">Title</label>
                <input 
                    value={post.title}
                    onChange={(e) => handleTitle(e)} // e näyttää, että tyyppi on "ChangeEvent<HTMLInputElement>" >> kopio ja laita tyyppi handle-funktioon & importtiin
                    name="title"
                    id="title"
                    type="text" 
                    placeholder="Enter community name" 
                />
                <label htmlFor="content">Description</label>
                <textarea
                    value={post.description}
                    onChange={(e) => handleDescription(e)}
                    name="content"
                    id="content"
                    placeholder="Description for your community"
                    rows={4}
                />
                
                <input // IMAGE
                    type="file"
                    onChange={handleImage}
                    name="image"
                    id="image"
                    accept="image/png, image/jpeg"
                />
                <button type="submit">Submit</button>
                <button type="reset" onClick={e=>handleReset(e)}>Reset</button>     
        </div>
   
    </form>
    );
}  

export default CreateTopic;
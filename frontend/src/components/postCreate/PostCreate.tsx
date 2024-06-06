import "./postCreate.scss";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import PostType from "../../types/PostType";
import axios from "axios";

interface TopicType {
    topic_id: number;
    title: string;
}

export default function PostCreate() {
    const [topics, setTopics] = useState<TopicType[]>([]);
    const [post, setPost] = useState<PostType>({
        post_id: 0,
        user_id: 1,
        title: "",
        content: "",
        image: null,
        created_at: "",
        upvotes: 0,
        downvotes: 0,
        topic: "General Discussion",
        topic_id: 0
    });

    useEffect(() => {
        async function fetchTopics() {
            try {
                const response = await axios.get("http://localhost:3001/topics");
                setTopics(response.data);
            } catch (error) {
                console.error("Error fetching topics:", error);
            }
        }

        fetchTopics();
    }, []);

    useEffect(() => {
        const generalDiscussionExists = topics.some(topic => topic.title === "General Discussion");
        if (!generalDiscussionExists) {
            createGeneralDiscussionTopic();
        }
    }, [topics]);

    const createGeneralDiscussionTopic = async () => {
        try {
            const response = await axios.post("http://localhost:3001/topics", {
                title: "General Discussion"
            });
            setTopics([...topics, response.data]);
        } catch (error) {
            console.error("Error creating General Discussion topic:", error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "topic") {
            const selectedTopic = topics.find(topic => topic.title === value);
            if (selectedTopic) {
                setPost({ ...post, topic: value, topic_id: selectedTopic.topic_id });
            }
        } else {
            setPost({ ...post, [name]: value });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", post.title || "");
        formData.append("content", post.content || "");
        formData.append("user_id", post.user_id.toString());
        formData.append("topic_id", post.topic_id.toString());
        if (post.image) {
            formData.append("image", post.image);
        }

        try {
            const response = await axios.post("http://localhost:3001/posts", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setPost({
                ...post,
                title: "",
                content: "",
                image: null
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <h2>Create a Post</h2>

                <label htmlFor="title">Title</label>
                <input
                    value={post.title}
                    onChange={handleChange}
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Enter post title"
                />

                <label htmlFor="content">Content</label>
                <textarea
                    value={post.content}
                    onChange={handleChange}
                    name="content"
                    id="content"
                    placeholder="Share your thoughts"
                    rows={4}
                />

                <label htmlFor="topic">Topic</label>
                <select
                    value={post.topic}
                    onChange={handleChange}
                    name="topic"
                    id="topic"
                >
                    <option value="General Discussion">General Discussion</option>
                    {topics.map((topic) => (
                        <option key={topic.topic_id} value={topic.title}>
                            {topic.title}
                        </option>
                    ))}
                </select>

                <input
                    type="file"
                    onChange={(e) => setPost({ ...post, image: e.target.files ? e.target.files[0] : null })}
                    name="image"
                    id="image"
                    accept="image/png, image/jpeg"
                />

                <button type="submit">Submit</button>
                <button type="reset" onClick={() => setPost({ ...post, title: "", content: "", image: null })}>Reset</button>
            </div>
        </form>
    );
}

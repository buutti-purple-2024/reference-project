import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from '../../components/post/Post'
import PostType from "../../types/PostType";
import "./community.scss"

const Community = () => {
  const baseurl = "http://localhost:3001"
  const [posts, setPosts] = useState([])
  const communityName = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchCommunityIfAvailable = async () => {
      try {
        console.log(communityName)
        const response = await axios.get(`${baseurl}/topics/?title=${communityName}`)
        console.log(response.data[0].posts)
        setPosts(response.data[0].posts)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCommunityIfAvailable()
    
  }, [])

  const mapPosts = () => {
    console.log(posts)
    return posts.map(post => (
      <Post 
          key={post.post_id} 
          post={post} // prop includes e.g. image, title & content
          username={''}
          profileImage={post.image || ''}
          upvotes={post.upvotes}
          downvotes={post.downvotes}
      />
    ));
  };

  return (
    <div className='div-community'>
      <h1>{communityName}</h1>
      {posts && mapPosts()}

    </div>
  )
}

export default Community
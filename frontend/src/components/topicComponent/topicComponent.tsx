import React, { useContext } from 'react'
import "./topicComponent.scss"
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { userContext } from '../../App'
import axios from 'axios'

interface topicInterface {
  created_at: string,
  description: string,
  image: string | null,
  post_id: number,
  title: string,
  user_id: number
}


const topicComponent = ({id, created_at, description, image, post_id, title, user_id, username}:topicInterface) => {
  const navigate = useNavigate()
  const {contextUsername, contextRole} = useContext(userContext)

  const deleteCommunity = async () => {
    try {
      const deletedTopic =  await axios.delete(`http://localhost:3001/topics/${id}`)
      console.log(deletedTopic)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="div-topic-component" >
      <img src={image ? image : "https://placehold.co/200x200"} alt="" />
      <div className='div-topic-title-desc'>
      {console.log(contextUsername, contextRole)}
      <div style={{width: "100%"}}>
      <Link to={`/community/${title}`} state={{description}}>
        <h1>{title}</h1>
        {description}
      </Link>
      </div>
      <div style={{display: "flex", width: "100%",  marginTop: "20px", justifyContent: "space-between"}}>
        <span style={{alignSelf: "flex-end"}}>created by: {username}</span>
        {(contextRole == "admin" || username == contextUsername)  && <button onClick={() => deleteCommunity()} style={{alignSelf: "flex-end"}}>Delete community</button>}
      </div>
      </div>
    </div>

  )
}

export default topicComponent
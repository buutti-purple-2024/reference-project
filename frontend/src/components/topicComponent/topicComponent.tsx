import React from 'react'
import "./topicComponent.scss"
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


interface topicInterface {
  created_at: string,
  description: string,
  image: string | null,
  post_id: number,
  title: string,
  user_id: number
}


const topicComponent = ({created_at, description, image, post_id, title, user_id}:topicInterface) => {
  const navigate = useNavigate()
  return (
    <div className="div-topic-component" >
      <img src={image ? image : "https://placehold.co/200x200"} alt="" />
      <Link to={`/community/${title}`} state={{description}}>
      <div>
        <h1>{title}</h1>
        {description}
      </div>
      </Link>

    </div>

  )
}

export default topicComponent
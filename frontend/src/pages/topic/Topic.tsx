import axios from 'axios'
import { useEffect, useState } from 'react'
import TopicComponent from '../../components/topicComponent/TopicComponent'
import "./topic.scss"


const Topic = () => {

  const baseurl = "http://localhost:3001"
  const [topics, setTopics] = useState(null)

  useEffect(() => {
    const fetchTopics = async () => {
        const response = await axios.get(`${baseurl}/topics`)
        console.log(response)
        setTopics(response.data)
    }
    fetchTopics()
}, [])

  const mapTopics = () => {
    console.log("map topics")
    return (
    topics.map(topic => {
      return (
        <TopicComponent id={topic.topic_id} title={topic.title} created_at={topic.created_at} description={topic.description} image={topic.image} post_id={topic.post_id} user_id={topic.user_id} username={topic.users.username} />

      )
    })
    )
    
  }

  return (
    <div className="div-topic-container">
      <h1>Topics</h1>
      {topics && mapTopics()}
    </div>
  )
}

export default Topic